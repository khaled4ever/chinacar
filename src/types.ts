export interface CarBrand {
  id: string;
  name: string; // Arabic name
  englishName: string;
  logo: string;
  description: string;
  commonModels: string[];
}

export interface WorkshopService {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  estimatedTime: string;
  basePrice: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  carBrand: string;
  carModel: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
