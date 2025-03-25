import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button, Container } from 'react-bootstrap';
import ThemeContext from '../../context/ThemeContext';
import DashboardNavbar from '../DashboardNavbar';
import Footer from '../Footer';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const lat = parseFloat(queryParams.get('lat')) || 20.5937;
  const lng = parseFloat(queryParams.get('lng')) || 78.9629;
  const [center, setCenter] = useState([lat, lng]);
  const [zoom, setZoom] = useState(10);
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    setCenter([lat, lng]);
    setZoom(10);
  }, [lat, lng]);

  return (
    <div style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}>
      <DashboardNavbar />
      <div
        style={{
          backgroundColor: isDarkTheme ? 'black' : 'white',
          color: isDarkTheme ? 'white' : 'black',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Container className="text-center mb-4">
          <h2>Interactive Map View</h2>
          <p style={{ color: 'grey' }}>
            Explore the selected location and navigate through the map effortlessly.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '460px', width: '80%', borderRadius: '10px', overflow: 'hidden' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center} icon={customIcon}>
              <Popup>Selected Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapView;
