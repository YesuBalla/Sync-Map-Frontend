import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';

import DashboardNavbar from '../DashboardNavbar';
import Footer from '../Footer';
import ThemeContext from '../../context/ThemeContext';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        navigate('/landing-page');
        return;
      }

      try {
        const response = await axios.get('https://sync-map-backend.onrender.com/dashboard', {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        navigate('/landing-page');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}>
      <div
        style={{
          backgroundColor: isDarkTheme ? 'black' : 'white',
          color: isDarkTheme ? 'white' : 'black',
          minHeight: '100vh',
        }}
      >
        <DashboardNavbar />
        <Container className="mt-4">
          <h2 className="text-center mb-2">Explore Popular Destinations</h2>
          <p className="text-center mb-4" style={{ color: 'grey' }}>
            Discover the most visited locations and plan your journey with real-time insights.
          </p>
          <Row>
            {cards.map((card) => (
              <Col key={card.id} md={4} className="mb-4">
                <Card
                  onClick={() => navigate(`/map?lat=${card.latitude}&lng=${card.longitude}`)}
                  className="shadow-sm"
                  style={{
                    backgroundColor: isDarkTheme ? '#333' : 'white',
                    color: isDarkTheme ? 'white' : 'black',
                    cursor: 'pointer',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={card.image_url}
                    alt={card.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                    <Card.Text>
                      <strong>Visitors:</strong> {card.tourist_visitors_count} <br />
                      <strong>Latitude:</strong> {card.latitude} <br />
                      <strong>Longitude:</strong> {card.longitude}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
