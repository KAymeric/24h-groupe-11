import React, { useState } from 'react';
import { useAlertContext } from '../context/AlertContext';
import { Filter, AlertTriangle } from 'lucide-react';
import AlertBanner from '../components/alerts/AlertBanner';
import { Alert } from '../types';

const AlertsPage = () => {
  const { activeAlerts, allZones } = useAlertContext();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');

  // Filter alerts based on selected filters
  const filteredAlerts = activeAlerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesZone = selectedZone === 'all' || alert.zoneId === selectedZone;
    return matchesSeverity && matchesType && matchesZone;
  });

  // Sort alerts by severity and then by date
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    
    if (severityDiff !== 0) return severityDiff;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  // Get unique alert types from all alerts
  const alertTypes = Array.from(new Set(activeAlerts.map(alert => alert.type)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={28} />
            Alertes Actives
          </h1>
          <p className="text-gray-600 mt-1">
            {sortedAlerts.length} alerte{sortedAlerts.length !== 1 ? 's' : ''} en cours à Lyon
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
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
            <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Niveau de sévérité
            </label>
            <select
              id="severity-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="all">Tous les niveaux</option>
              <option value="critical">Critique</option>
              <option value="high">Élevé</option>
              <option value="medium">Moyen</option>
              <option value="low">Faible</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Type d'alerte
            </label>
            <select
              id="type-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              {alertTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'flood' && 'Inondation'}
                  {type === 'fire' && 'Incendie'}
                  {type === 'storm' && 'Tempête'}
                  {type === 'earthquake' && 'Séisme'}
                  {type === 'chemical' && 'Chimique'}
                  {type === 'other' && 'Autre'}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="zone-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Zone
            </label>
            <select
              id="zone-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              <option value="all">Toutes les zones</option>
              {allZones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <AlertBanner key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">Aucune alerte ne correspond aux critères sélectionnés.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;