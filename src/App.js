import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './components/LandingPage';
import ThemeContext from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';



const App = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => setDarkTheme(prevState => !prevState); 

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <Router> 
        <Routes>
          <Route path="/landing-page" element={<LandingPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/map" 
            element={
            <ProtectedRoute>
              <MapView/>
            </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
