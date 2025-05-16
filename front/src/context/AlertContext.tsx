import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert, Zone } from '../types';
import { mockAlerts, mockZones } from '../data/mockData';

interface AlertContextType {
  activeAlerts: Alert[];
  allZones: Zone[];
  addAlert: (alert: Alert) => void;
  updateAlert: (alertId: string, updatedData: Partial<Alert>) => void;
  removeAlert: (alertId: string) => void;
  getZoneAlerts: (zoneId: string) => Alert[];
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>(mockAlerts);
  const [allZones, setAllZones] = useState<Zone[]>(mockZones);

  // Simulate fetching data from an API
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're using the mock data from import
    const fetchData = () => {
      // This is where we would fetch real data
      console.log('Fetching alert data...');
    };

    fetchData();
    // Set up a polling interval to refresh data
    const intervalId = setInterval(fetchData, 60000); // Every minute

    return () => clearInterval(intervalId);
  }, []);

  const addAlert = (alert: Alert) => {
    setActiveAlerts(prev => [...prev, alert]);
  };

  const updateAlert = (alertId: string, updatedData: Partial<Alert>) => {
    setActiveAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, ...updatedData } : alert
      )
    );
  };

  const removeAlert = (alertId: string) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getZoneAlerts = (zoneId: string) => {
    return activeAlerts.filter(alert => alert.zoneId === zoneId);
  };

  return (
    <AlertContext.Provider 
      value={{ 
        activeAlerts, 
        allZones, 
        addAlert, 
        updateAlert, 
        removeAlert, 
        getZoneAlerts 
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};