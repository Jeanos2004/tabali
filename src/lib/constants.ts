// Palette de couleurs inspirée de la Guinée
export const COLORS = {
  primary: {
    DEFAULT: '#008751', // Vert guinéen
    light: '#4CAF50',
    dark: '#006442',
  },
  secondary: {
    DEFAULT: '#CE1126', // Rouge guinéen
    light: '#E53935',
    dark: '#B71C1C',
  },
  accent: {
    DEFAULT: '#FCD116', // Jaune guinéen
    light: '#FFEB3B',
    dark: '#FBC02D',
  },
  neutral: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
};

// Services proposés sur la plateforme
export const SERVICES = [
  'Ménage',
  'Plomberie',
  'Électricité',
  'Jardinage',
  'Peinture',
  'Menuiserie',
  'Maçonnerie',
  'Déménagement',
  /*'Garde d\'enfants',
   'Cours particuliers',
  'Réparation électronique',
  'Coiffure à domicile',
  'Cuisine à domicile', */
];

// Villes principales en Guinée
export const CITIES = [
  'Conakry',
  'Nzérékoré',
  'Kankan',
  'Kindia',
  'Labé',
  'Mamou',
  'Boké',
  'Faranah',
  'Siguiri',
  'Guéckédou',
];

// Données fictives pour les prestataires
export const MOCK_PROVIDERS = [
  {
    id: '1',
    name: 'Amadou Diallo',
    profileImage: '/providers/provider-1.jpg',
    services: ['Plomberie', 'Électricité'],
    rating: 4.8,
    reviewCount: 124,
    location: {
      lat: 9.6412,
      lng: -13.5784,
      address: 'Kaloum, Conakry',
    },
    areasServed: ['Kaloum', 'Dixinn', 'Ratoma'],
    description: 'Plombier et électricien professionnel avec plus de 10 ans d\'expérience dans le domaine.',
    hourlyRate: 50000,
    availability: {
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      hours: {
        start: '08:00',
        end: '18:00',
      },
    },
    gallery: ['/gallery/plumbing-1.jpg', '/gallery/electric-1.jpg', '/gallery/plumbing-2.jpg'],
  },
  {
    id: '2',
    name: 'Mariama Camara',
    profileImage: '/providers/provider-2.jpg',
    services: ['Ménage', 'Garde d\'enfants'],
    rating: 4.9,
    reviewCount: 87,
    location: {
      lat: 9.6312,
      lng: -13.5684,
      address: 'Ratoma, Conakry',
    },
    areasServed: ['Ratoma', 'Dixinn', 'Matam'],
    description: 'Service de ménage professionnel et garde d\'enfants expérimentée.',
    hourlyRate: 40000,
    availability: {
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      hours: {
        start: '07:00',
        end: '19:00',
      },
    },
    gallery: ['/gallery/cleaning-1.jpg', '/gallery/childcare-1.jpg', '/gallery/cleaning-2.jpg'],
  },
  {
    id: '3',
    name: 'Ibrahim Soumah',
    profileImage: '/providers/provider-3.jpg',
    services: ['Jardinage', 'Déménagement'],
    rating: 4.7,
    reviewCount: 56,
    location: {
      lat: 9.6512,
      lng: -13.5884,
      address: 'Matam, Conakry',
    },
    areasServed: ['Matam', 'Kaloum', 'Dixinn'],
    description: 'Expert en jardinage et service de déménagement fiable.',
    hourlyRate: 45000,
    availability: {
      days: ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      hours: {
        start: '08:00',
        end: '17:00',
      },
    },
    gallery: ['/gallery/gardening-1.jpg', '/gallery/moving-1.jpg', '/gallery/gardening-2.jpg'],
  },
];
