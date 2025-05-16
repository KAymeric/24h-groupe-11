import React from 'react';
import { Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Lyon<span className="text-red-400">Alert</span></h3>
            <p className="text-blue-200 text-sm">
              Système d'alerte pour les catastrophes et situations d'urgence à Lyon.
              Restez informé, restez en sécurité.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.lyon.fr" className="text-blue-200 hover:text-white flex items-center">
                  <ExternalLink size={14} className="mr-1" />
                  Ville de Lyon
                </a>
              </li>
              <li>
                <a href="https://www.gouvernement.fr/risques" className="text-blue-200 hover:text-white flex items-center">
                  <ExternalLink size={14} className="mr-1" />
                  Risques - Gouvernement
                </a>
              </li>
              <li>
                <a href="https://meteofrance.com" className="text-blue-200 hover:text-white flex items-center">
                  <ExternalLink size={14} className="mr-1" />
                  Météo France
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact d'Urgence</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center text-blue-200">
                <Phone size={14} className="mr-2" />
                Urgences: <span className="font-semibold ml-1">112</span>
              </p>
              <p className="flex items-center text-blue-200">
                <Phone size={14} className="mr-2" />
                Pompiers: <span className="font-semibold ml-1">18</span>
              </p>
              <p className="flex items-center text-blue-200">
                <Mail size={14} className="mr-2" />
                <a href="mailto:contact@lyonalert.fr" className="hover:text-white">
                  contact@lyonalert.fr
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} LyonAlert. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;