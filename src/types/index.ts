export interface Provider {
  id: string;
  name: string;
  profileImage: string;
  services: string[];
  rating: number;
  reviewCount: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  areasServed: string[];
  description: string;
  hourlyRate: number;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  gallery: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: 'client' | 'provider' | 'admin';
}

export interface Booking {
  id: string;
  providerId: string;
  clientId: string;
  service: string;
  date: string;
  timeSlot: {
    start: string;
    end: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}
