import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AlertsPage from './pages/AlertsPage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ResourcesPage from './pages/ResourcesPage';
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <AlertProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;