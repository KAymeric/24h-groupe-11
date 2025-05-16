import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AlertTriangle, Map, MessageSquare, Compass, ChevronFirst as First, Menu, X } from 'lucide-react';
import { useAlertContext } from '../../context/AlertContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeAlerts } = useAlertContext();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { to: "/", label: "Accueil", icon: <AlertTriangle className="mr-1" size={18} /> },
    { to: "/alerts", label: "Alertes", icon: <AlertTriangle className="mr-1" size={18} />, badge: activeAlerts.length },
    { to: "/map", label: "Carte", icon: <Map className="mr-1" size={18} /> },
    { to: "/chat", label: "Chat Local", icon: <MessageSquare className="mr-1" size={18} /> },
    { to: "/activities", label: "Activités", icon: <Compass className="mr-1" size={18} /> },
    { to: "/resources", label: "Ressources", icon: <First className="mr-1" size={18} /> },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <AlertTriangle className="text-blue-600 mr-2" size={24} />
              <span className="font-bold text-xl text-blue-600">Lyon<span className="text-red-500">Alert</span></span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`
                }
              >
                {link.icon}
                {link.label}
                {link.badge && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3">
            <div className="flex flex-col space-y-2 pb-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;