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
}

export interface DailyEarning {
  date: string;
  cash: number;
  banking: number;
  total: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'owner' | 'customer';
  stallId?: string;
}
