import React, { useState } from 'react';
import { useAlertContext } from '../context/AlertContext';
import { ChevronFirst as First, Search, MapPin, Phone, Filter } from 'lucide-react';
import { mockResources } from '../data/mockData';
import { Resource } from '../types';

const ResourcesPage = () => {
  const { allZones } = useAlertContext();
  const [resources] = useState<Resource[]>(mockResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      searchQuery === '' || 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesAvailability = selectedAvailability === 'all' || resource.availability === selectedAvailability;
    
    return matchesSearch && matchesType && matchesAvailability;
  });

  // Get type icon and style
  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'shelter':
        return { icon: <First size={18} className="text-blue-500" />, color: 'text-blue-500', label: 'Abri' };
      case 'medical':
        return { icon: <First size={18} className="text-red-500" />, color: 'text-red-500', label: 'Médical' };
      case 'food':
        return { icon: <First size={18} className="text-green-500" />, color: 'text-green-500', label: 'Nourriture' };
      case 'water':
        return { icon: <First size={18} className="text-blue-500" />, color: 'text-blue-500', label: 'Eau' };
      default:
        return { icon: <First size={18} className="text-gray-500" />, color: 'text-gray-500', label: 'Autre' };
    }
  };

  // Get availability badge
  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'open':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ouvert</span>;
      case 'limited':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Limité</span>;
      case 'closed':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Fermé</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Inconnu</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <First className="mr-2 text-blue-500" size={28} />
            Ressources d'Urgence
          </h1>
          <p className="text-gray-600 mt-1">
            Trouvez des abris, des soins médicaux, de la nourriture et de l'eau
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Type de ressource
            </label>
            <select
              id="type-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="shelter">Abri</option>
              <option value="medical">Médical</option>
              <option value="food">Nourriture</option>
              <option value="water">Eau</option>
              <option value="other">Autre</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="availability-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Disponibilité
            </label>
            <select
              id="availability-filter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="all">Toutes les disponibilités</option>
              <option value="open">Ouvert</option>
              <option value="limited">Limité</option>
              <option value="closed">Fermé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => {
            const typeInfo = getTypeInfo(resource.type);
            
            return (
              <div key={resource.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 mb-3 md:mb-0">
                    {typeInfo.icon}
                  </div>
                  
                  <div className="flex-grow md:mr-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{resource.name}</h3>
                      {getAvailabilityBadge(resource.availability)}
                      <span className={`text-sm ${typeInfo.color}`}>{typeInfo.label}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span>{resource.address}</span>
                      </div>
                      
                      {resource.contact && (
                        <div className="flex items-center sm:ml-4">
                          <Phone size={14} className="mr-1 flex-shrink-0" />
                          <span>{resource.contact}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                 
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">Aucune ressource ne correspond aux critères sélectionnés.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;