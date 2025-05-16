import React, { useState } from 'react';
import { useAlertContext } from '../context/AlertContext';
import { Compass, Filter, AlertTriangle, ShieldCheck } from 'lucide-react';
import { mockActivities } from '../data/mockData';
import { Activity } from '../types';

const ActivitiesPage = () => {
  const { allZones } = useAlertContext();
  const [activities] = useState<Activity[]>(mockActivities);
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedSafety, setSelectedSafety] = useState<string>('all');
  
  // Filter activities based on selected filters
  const filteredActivities = activities.filter(activity => {
    const matchesCondition = selectedCondition === 'all' || activity.conditions === selectedCondition;
    const matchesZone = selectedZone === 'all' || activity.zoneId === selectedZone;
    const matchesSafety = selectedSafety === 'all' || activity.safetyLevel === selectedSafety;
    return matchesCondition && matchesZone && matchesSafety;
  });

  // Get safety label and styling
  const getSafetyInfo = (safetyLevel: string) => {
    switch (safetyLevel) {
      case 'safe':
        return {
          label: 'Sûr',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <ShieldCheck className="text-green-500 mr-1" size={14} />
        };
      case 'moderate-risk':
        return {
          label: 'Risque modéré',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: <AlertTriangle className="text-yellow-500 mr-1" size={14} />
        };
      case 'high-risk':
        return {
          label: 'Risque élevé',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: <AlertTriangle className="text-red-500 mr-1" size={14} />
        };
      default:
        return {
          label: 'Inconnu',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: null
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Compass className="mr-2 text-green-500" size={28} />
            Activités
          </h1>
          <p className="text-gray-600 mt-1">
            Trouvez des activités adaptées aux conditions actuelles
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="condition-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Conditions
            </label>
            <select
              id="condition-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="all">Toutes les conditions</option>
              <option value="flood">Inondation</option>
              <option value="storm">Tempête</option>
              <option value="normal">Normal</option>
              <option value="any">Toutes conditions</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="zone-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Zone
            </label>
            <select
              id="zone-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              <option value="all">Toutes les zones</option>
              {allZones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="safety-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Niveau de sécurité
            </label>
            <select
              id="safety-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedSafety}
              onChange={(e) => setSelectedSafety(e.target.value)}
            >
              <option value="all">Tous les niveaux</option>
              <option value="safe">Sûr</option>
              <option value="moderate-risk">Risque modéré</option>
              <option value="high-risk">Risque élevé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => {
            const safetyInfo = getSafetyInfo(activity.safetyLevel);
            const zoneName = allZones.find(z => z.id === activity.zoneId)?.name || 'Inconnu';
            
            return (
              <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{activity.title}</h3>
                    <div className={`${safetyInfo.bgColor} ${safetyInfo.textColor} flex items-center text-xs px-2 py-1 rounded-full`}>
                      {safetyInfo.icon}
                      {safetyInfo.label}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {zoneName}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {activity.conditions === 'flood' && 'Inondation'}
                      {activity.conditions === 'storm' && 'Tempête'}
                      {activity.conditions === 'normal' && 'Normal'}
                      {activity.conditions === 'any' && 'Toutes conditions'}
                    </span>
                  </div>
                  
                  <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors">
                    Voir les détails
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Aucune activité ne correspond aux critères sélectionnés.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;