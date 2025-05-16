import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert } from '../../types';

interface AlertBannerProps {
  alert: Alert;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alert }) => {
  // Define styles based on severity
  const getAlertStyles = () => {
    switch (alert.severity) {
      case 'critical':
        return {
          bg: 'bg-red-100',
          border: 'border-red-300',
          text: 'text-red-800',
          icon: <AlertTriangle className="text-red-600" size={24} />,
        };
      case 'high':
        return {
          bg: 'bg-orange-100',
          border: 'border-orange-300',
          text: 'text-orange-800',
          icon: <AlertCircle className="text-orange-600" size={24} />,
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          border: 'border-yellow-300',
          text: 'text-yellow-800',
          icon: <AlertCircle className="text-yellow-600" size={24} />,
        };
      default:
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-300',
          text: 'text-blue-800',
          icon: <Info className="text-blue-600" size={24} />,
        };
    }
  };

  const styles = getAlertStyles();

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 flex items-start animated-pulse`}>
      <div className="mr-3 flex-shrink-0 mt-1">
        {styles.icon}
      </div>
      <div className="flex-grow">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className={`font-bold ${styles.text}`}>{alert.title}</h3>
          <span className="text-xs text-gray-500">
            Mis à jour: {formatDate(alert.updatedAt)}
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
        {alert.instructions && (
          <p className={`text-sm font-medium ${styles.text} mt-2`}>
            {alert.instructions}
          </p>
        )}
        <div className="mt-2">
          <Link 
            to={`/alerts/${alert.id}`} 
            className={`text-sm font-medium underline ${styles.text} hover:opacity-80`}
          >
            Plus de détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;