import React, { useState, useEffect } from 'react';
import { useAlertContext } from '../context/AlertContext';
import { Map, MapPin, AlertTriangle, Home, Filter } from 'lucide-react';
import { Zone } from '../types';

const MapPage = () => {
  const { activeAlerts, allZones } = useAlertContext();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // In a real app, this would be a proper map implementation with Leaflet, Google Maps, etc.
  // For this demo, we're using a placeholder image
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Get color for zone based on risk level
  const getZoneColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  // Count alerts by zone
  const alertCountByZone = allZones.map(zone => ({
    ...zone,
    alertCount: activeAlerts.filter(alert => alert.zoneId === zone.id).length
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Map className="mr-2 text-blue-500" size={28} />
            Carte des Risques
          </h1>
          <p className="text-gray-600 mt-1">
            Visualisez les zones à risque et les alertes en cours à Lyon
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filtres
          </button>
          <button className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700">
            <Home size={16} className="mr-2" />
            Ma Position
          </button>
        </div>
      </div>

      {/* Map and Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Display */}
        <div className="lg:flex-grow">
          <div className="bg-gray-100 rounded-xl overflow-hidden h-[500px] relative">
            {!mapLoaded ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* This would be a real map in a production app */}
                <img 
                  src ="../asset/img/carte.png" 
                  className="w-full h-full object-cover"
                />
                
                {/* Zone markers (these would be properly positioned on a real map) */}
                <div className="absolute inset-0 pointer-events-none">
                  {allZones.map((zone, index) => {
                    // Calculate position - in a real app this would use actual coordinates
                    const top = 20 + (index * 15) + Math.random() * 40;
                    const left = 20 + (index * 15) + Math.random() * 60;
                    
                    return (
                      <div 
                        key={zone.id}
                        className="absolute cursor-pointer pointer-events-auto"
                        style={{ top: `${top}%`, left: `${left}%` }}
                        onClick={() => setSelectedZone(zone)}
                      >
                        <div className={`${getZoneColor(zone.riskLevel)} w-5 h-5 rounded-full flex items-center justify-center animate-pulse`}>
                          {activeAlerts.some(alert => alert.zoneId === zone.id) && (
                            <AlertTriangle className="text-white" size={12} />
                          )}
                        </div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                          {zone.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Info box for selected zone */}
                {selectedZone && (
                  <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{selectedZone.name}</h3>
                      <button 
                        onClick={() => setSelectedZone(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{selectedZone.description}</p>
                    <div className="flex items-center mb-2">
                      <span className={`w-3 h-3 rounded-full ${getZoneColor(selectedZone.riskLevel)} mr-2`}></span>
                      <span className="text-sm">
                        Niveau de risque: 
                        <span className="font-medium ml-1">
                          {selectedZone.riskLevel === 'critical' && 'Critique'}
                          {selectedZone.riskLevel === 'high' && 'Élevé'}
                          {selectedZone.riskLevel === 'medium' && 'Moyen'}
                          {selectedZone.riskLevel === 'low' && 'Faible'}
                          {selectedZone.riskLevel === 'safe' && 'Sûr'}
                        </span>
                      </span>
                    </div>
                    <div className="text-sm mb-2">
                      <span className="text-gray-600">Population:</span> <span className="font-medium">{selectedZone.population.toLocaleString()}</span>
                    </div>
                    
                    {/* Alerts for this zone */}
                    {activeAlerts.filter(alert => alert.zoneId === selectedZone.id).length > 0 ? (
                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center">
                          <AlertTriangle className="text-red-500 mr-1" size={14} />
                          Alertes actives:
                        </h4>
                        <ul className="text-xs space-y-1">
                          {activeAlerts
                            .filter(alert => alert.zoneId === selectedZone.id)
                            .map(alert => (
                              <li key={alert.id} className="flex items-start">
                                <span className="block w-2 h-2 rounded-full bg-red-500 mt-1 mr-1 flex-shrink-0"></span>
                                <span>{alert.title}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">Aucune alerte active dans cette zone</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Sidebar with Zone List */}
        <div className="lg:w-80 bg-white rounded-xl shadow p-4">
          <h2 className="font-bold text-lg mb-4">Zones</h2>
          <div className="space-y-3">
            {alertCountByZone.map(zone => (
              <div 
                key={zone.id} 
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex items-center">
                  <div className={`${getZoneColor(zone.riskLevel)} w-3 h-3 rounded-full mr-3`}></div>
                  <div>
                    <h3 className="font-medium">{zone.name}</h3>
                    <p className="text-xs text-gray-500">{zone.population.toLocaleString()} habitants</p>
                  </div>
                </div>
                {zone.alertCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                    {zone.alertCount} alerte{zone.alertCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-bold text-sm mb-2">Légende</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="bg-red-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="text-xs">Risque critique</span>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="text-xs">Risque élevé</span>
              </div>
              <div className="flex items-center">
                <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="text-xs">Risque moyen</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="text-xs">Risque faible</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="text-xs">Zone sûre</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;