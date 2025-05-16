import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, MapPin, Users, Megaphone } from 'lucide-react';
import { useAlertContext } from '../context/AlertContext';
import AlertBanner from '../components/alerts/AlertBanner';

const HomePage = () => {
  const { activeAlerts } = useAlertContext();
  
  // Get the most critical alert for the banner
  const criticalAlert = activeAlerts.find(alert => alert.severity === 'critical') || 
                       activeAlerts.find(alert => alert.severity === 'high') ||
                       activeAlerts[0];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Alert Banner */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
           
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Système d'Alerte en Temps Réel pour Lyon
            </h1>
            <p className="text-xl mb-8">
              Restez informé des catastrophes et urgences. Accédez aux informations vitales, communiquez avec votre communauté, et trouvez des ressources d'urgence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/alerts" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200 inline-flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                Voir les Alertes
              </Link>
              <Link to="/map" className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200 inline-flex items-center">
                <MapPin className="mr-2" size={20} />
                Carte Interactive
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Alert Banner */}
      {criticalAlert && (
        <div className="bg-red-50 border-y border-red-200">
          <div className="container mx-auto px-4 py-3">
            <AlertBanner alert={criticalAlert} />
          </div>
        </div>
      )}
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Notre Système de Protection
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Alertes en Temps Réel</h3>
            <p className="text-gray-600">
              Recevez des notifications instantanées sur les situations d'urgence dans votre quartier.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Carte Interactive</h3>
            <p className="text-gray-600">
              Visualisez les zones touchées et trouvez les ressources d'urgence à proximité.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Chat Communautaire</h3>
            <p className="text-gray-600">
              Communiquez avec vos voisins et les autorités locales pendant les situations d'urgence.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mode Hors-ligne</h3>
            <p className="text-gray-600">
              Accédez aux informations critiques même sans connexion internet.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Megaphone className="mx-auto mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Restez informé, restez en sécurité
            </h2>
            <p className="text-xl mb-8">
              LyonAlert vous fournit des informations vitales pendant les situations d'urgence. Inscrivez-vous pour recevoir des alertes personnalisées.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                />
                <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 whitespace-nowrap">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;