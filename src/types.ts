export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  orderCount: number;
}

export interface Stall {
  id: string;
  ownerId: string;
  name: string;
  hawkerCenterId: string;
  unitNumber: string;
  cuisine: string;
  menu: MenuItem[];
  operatingHours: string;
  description: string;
}

export interface StallInCenter {
  id: string;
  name: string;
  unitNumber: string;
  cuisine: string;
  image: string;
  dineInQueue: number;
  takeawayQueue: number;
  rating: number;
  isOpen: boolean;
  menu: MenuItem[];
}

export interface HawkerCenter {
  id: string;
  name: string;
  address: string;
  image: string;
  dineInQueue: number;
  takeawayQueue: number;
  crowdLevel: 'low' | 'medium' | 'high';
  totalStalls: number;
  lat: number;
  lng: number;
  stalls: StallInCenter[];
}

export interface DailyEarning {
  date: string;
  cash: number;
  banking: number;
  total: number;
}

export interface IncomingOrder {
  id: string;
  customerName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  type: 'dine-in' | 'takeaway';
  status: 'pending' | 'accepted' | 'declined' | 'sold-out' | 'completed';
  timestamp: string;
  tableNumber?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  qty: number;
  stallName: string;
  stallId: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'owner' | 'customer';
  stallId?: string;
  partnerCompany?: string;
  priorityQueue?: boolean;
}
