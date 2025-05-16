import { Alert, Zone, Activity, Resource, ChatMessage } from '../types';

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'high',
    title: 'Inondation majeure du Rhône',
    description: 'Le niveau du Rhône continue de monter et menace plusieurs quartiers du 2ème et du 7ème arrondissement.',
    zoneId: 'zone1',
    startTime: new Date('2025-05-10T08:30:00'),
    updatedAt: new Date('2025-05-10T14:45:00'),
    instructions: 'Évacuez immédiatement si vous êtes dans une zone à risque. Dirigez-vous vers les centres d\'accueil.',
    imageUrl: 'https://images.pexels.com/photos/1755702/pexels-photo-1755702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    type: 'chemical',
    severity: 'medium',
    title: 'Fuite de produits chimiques',
    description: 'Une fuite de produits chimiques a été signalée dans la zone industrielle de Gerland. Les autorités sont sur place.',
    zoneId: 'zone3',
    startTime: new Date('2025-05-09T16:15:00'),
    updatedAt: new Date('2025-05-10T09:20:00'),
    instructions: 'Restez à l\'intérieur et fermez portes et fenêtres. Ne sortez pas jusqu\'à nouvel ordre.',
    imageUrl: 'https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    type: 'storm',
    severity: 'critical',
    title: 'Tempête violente',
    description: 'Une tempête exceptionnelle avec des vents jusqu\'à 140 km/h traverse la région lyonnaise. Risque de chutes d\'arbres et d\'inondations.',
    zoneId: 'zone2',
    startTime: new Date('2025-05-10T13:00:00'),
    updatedAt: new Date('2025-05-10T15:10:00'),
    instructions: 'Mettez-vous à l\'abri dans un bâtiment solide, éloignez-vous des fenêtres et des arbres.',
    imageUrl: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Mock zones data for Lyon
export const mockZones: Zone[] = [
  {
    id: 'zone1',
    name: 'Presqu\'île',
    coordinates: {
      lat: 45.7640,
      lng: 4.8357,
    },
    riskLevel: 'high',
    population: 42000,
    description: 'Centre-ville entre Rhône et Saône, comprenant les 1er et 2ème arrondissements',
  },
  {
    id: 'zone2',
    name: 'Croix-Rousse',
    coordinates: {
      lat: 45.7785,
      lng: 4.8285,
    },
    riskLevel: 'medium',
    population: 36000,
    description: '4ème arrondissement situé sur la colline, risque de glissements de terrain',
  },
  {
    id: 'zone3',
    name: 'Gerland',
    coordinates: {
      lat: 45.7322,
      lng: 4.8300,
    },
    riskLevel: 'critical',
    population: 30000,
    description: 'Zone industrielle et résidentielle du 7ème arrondissement, proche du Rhône',
  },
  {
    id: 'zone4',
    name: 'Part-Dieu',
    coordinates: {
      lat: 45.7605,
      lng: 4.8570,
    },
    riskLevel: 'low',
    population: 25000,
    description: 'Quartier d\'affaires du 3ème arrondissement avec la gare principale',
  },
  {
    id: 'zone5',
    name: 'Vieux Lyon',
    coordinates: {
      lat: 45.7620,
      lng: 4.8270,
    },
    riskLevel: 'medium',
    population: 15000,
    description: 'Quartier historique du 5ème arrondissement, risque d\'inondation par la Saône',
  },
];

// Mock activities data
export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Surf urbain à Confluence',
    description: 'Profitez des eaux de crue pour faire du surf urbain dans le quartier de Confluence. Encadré par des professionnels et sécurisé.',
    conditions: 'flood',
    zoneId: 'zone1',
    safetyLevel: 'moderate-risk',
    imageUrl: 'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'Randonnée au Parc de la Tête d\'Or',
    description: 'Le parc reste ouvert dans les zones non-inondées, profitez d\'une balade dans la nature en pleine ville.',
    conditions: 'normal',
    zoneId: 'zone4',
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    title: 'Kitesurf sur les quais du Rhône',
    description: 'Les vents exceptionnels offrent des conditions idéales pour pratiquer le kitesurf sur les quais aménagés.',
    conditions: 'storm',
    zoneId: 'zone3',
    safetyLevel: 'high-risk',
    imageUrl: 'https://images.pexels.com/photos/1604779/pexels-photo-1604779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    title: 'Visite des traboules sécurisées',
    description: 'Certaines traboules historiques restent accessibles et offrent un abri en cas d\'intempéries.',
    conditions: 'any',
    zoneId: 'zone5',
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/6498088/pexels-photo-6498088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Mock resources data
export const mockResources: Resource[] = [
  {
    id: '1',
    type: 'shelter',
    name: 'Palais des Sports de Gerland',
    description: 'Centre d\'hébergement temporaire avec 500 lits disponibles, repas et soins de base.',
    address: '350 Avenue Jean Jaurès, 69007 Lyon',
    coordinates: {
      lat: 45.7283,
      lng: 4.8320,
    },
    availability: 'open',
    contact: '04 72 76 85 85',
  },
  {
    id: '2',
    type: 'medical',
    name: 'Hôpital Édouard Herriot',
    description: 'Service d\'urgence ouvert 24/7, capacité renforcée pour les victimes des catastrophes.',
    address: '5 Place d\'Arsonval, 69003 Lyon',
    coordinates: {
      lat: 45.7433,
      lng: 4.8800,
    },
    availability: 'limited',
    contact: '04 72 11 69 53',
  },
  {
    id: '3',
    type: 'food',
    name: 'Distribution Croix Rouge - Bellecour',
    description: 'Distribution de repas chauds et d\'eau potable trois fois par jour.',
    address: 'Place Bellecour, 69002 Lyon',
    coordinates: {
      lat: 45.7580,
      lng: 4.8320,
    },
    availability: 'open',
    contact: '09 70 28 30 00',
  },
  {
    id: '4',
    type: 'water',
    name: 'Point d\'eau potable - Part-Dieu',
    description: 'Eau potable disponible en libre-service, apportez vos contenants.',
    address: 'Parvis de la gare Part-Dieu, 69003 Lyon',
    coordinates: {
      lat: 45.7605,
      lng: 4.8592,
    },
    availability: 'open',
    contact: 'N/A',
  },
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Marie D.',
    zoneId: 'zone1',
    content: 'Le niveau de l\'eau continue de monter rue Mercière, l\'accès est complètement coupé maintenant.',
    timestamp: new Date('2025-05-10T14:23:00'),
    isOfficial: false,
  },
  {
    id: '2',
    userId: 'official1',
    userName: 'Mairie de Lyon',
    zoneId: 'zone1',
    content: 'Une équipe de pompiers est déployée place des Jacobins pour aider à l\'évacuation. Contactez le 18 en cas d\'urgence.',
    timestamp: new Date('2025-05-10T14:30:00'),
    isOfficial: true,
  },
  {
    id: '3',
    userId: 'user2',
    userName: 'Thomas L.',
    zoneId: 'zone1',
    content: 'Il y a encore de la place au centre d\'accueil de Bellecour pour ceux qui ont besoin d\'un abri.',
    timestamp: new Date('2025-05-10T14:45:00'),
    isOfficial: false,
  },
  {
    id: '4',
    userId: 'user3',
    userName: 'Sarah M.',
    zoneId: 'zone3',
    content: 'Est-ce que quelqu\'un sait si la route vers l\'hôpital Édouard Herriot est accessible depuis Gerland?',
    timestamp: new Date('2025-05-10T15:02:00'),
    isOfficial: false,
  },
  {
    id: '5',
    userId: 'official2',
    userName: 'Police Nationale',
    zoneId: 'zone3',
    content: 'L\'avenue Jean Jaurès est fermée entre le stade et le boulevard Yves Farges en raison des inondations. Suivez les déviations.',
    timestamp: new Date('2025-05-10T15:10:00'),
    isOfficial: true,
  },
];