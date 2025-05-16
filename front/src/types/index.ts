export interface Alert {
  id: string;
  type: 'flood' | 'fire' | 'storm' | 'earthquake' | 'chemical' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  zoneId: string;
  startTime: Date;
  endTime?: Date;
  updatedAt: Date;
  instructions?: string;
  imageUrl?: string;
}

export interface Zone {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  riskLevel: 'low' | 'medium' | 'high' | 'critical' | 'safe';
  population: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  zoneId: string;
  content: string;
  timestamp: Date;
  isOfficial: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  conditions: 'flood' | 'storm' | 'normal' | 'any';
  zoneId: string;
  safetyLevel: 'safe' | 'moderate-risk' | 'high-risk';
  imageUrl: string;
}

export interface Resource {
  id: string;
  type: 'shelter' | 'medical' | 'food' | 'water' | 'other';
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  availability: 'open' | 'limited' | 'closed';
  contact: string;
}