import type { HawkerCenter, DailyEarning, MenuItem, Stall, User, StallInCenter, IncomingOrder } from '../types';

const stallMenus: Record<string, MenuItem[]> = {
  chickenRice: [
    { id: 'cr1', name: 'Hainanese Chicken Rice', price: 4.50, category: 'Rice', image: '🍗', orderCount: 156 },
    { id: 'cr2', name: 'Roasted Chicken Rice', price: 5.00, category: 'Rice', image: '🍖', orderCount: 98 },
    { id: 'cr3', name: 'Chicken Rice Set (with soup)', price: 6.50, category: 'Set', image: '🍲', orderCount: 72 },
  ],
  laksa: [
    { id: 'lk1', name: 'Katong Laksa', price: 5.50, category: 'Noodles', image: '🥘', orderCount: 142 },
    { id: 'lk2', name: 'Laksa with Cockles', price: 6.50, category: 'Noodles', image: '🦪', orderCount: 89 },
    { id: 'lk3', name: 'Prawn Laksa', price: 7.00, category: 'Noodles', image: '🦐', orderCount: 65 },
  ],
  satay: [
    { id: 'st1', name: 'Chicken Satay (10pcs)', price: 8.00, category: 'Grill', image: '🍢', orderCount: 167 },
    { id: 'st2', name: 'Beef Satay (10pcs)', price: 9.00, category: 'Grill', image: '🥩', orderCount: 134 },
    { id: 'st3', name: 'Pork Satay (10pcs)', price: 8.50, category: 'Grill', image: '🥓', orderCount: 110 },
  ],
  charKwayTeow: [
    { id: 'ck1', name: 'Char Kway Teow', price: 5.00, category: 'Noodles', image: '🍜', orderCount: 128 },
    { id: 'ck2', name: 'Seafood Char Kway Teow', price: 7.00, category: 'Noodles', image: '🦞', orderCount: 75 },
  ],
  bakKutTeh: [
    { id: 'bk1', name: 'Bak Kut Teh', price: 6.50, category: 'Soup', image: '🍖', orderCount: 98 },
    { id: 'bk2', name: 'Premium Ribs Bak Kut Teh', price: 9.00, category: 'Soup', image: '🦴', orderCount: 55 },
  ],
  carrotCake: [
    { id: 'cc1', name: 'White Carrot Cake', price: 4.00, category: 'Snack', image: '🥮', orderCount: 103 },
    { id: 'cc2', name: 'Black Carrot Cake', price: 4.50, category: 'Snack', image: '🧆', orderCount: 88 },
  ],
  iceKachang: [
    { id: 'ik1', name: 'Ice Kachang', price: 2.50, category: 'Dessert', image: '🍧', orderCount: 189 },
    { id: 'ik2', name: 'Chendol', price: 3.00, category: 'Dessert', image: '🥥', orderCount: 145 },
  ],
};

export const hawkerCenters: HawkerCenter[] = [
  {
    id: 'hc1',
    name: 'Maxwell Food Centre',
    address: '1 Kadayanallur St, Singapore 069184',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600',
    dineInQueue: 34,
    takeawayQueue: 21,
    crowdLevel: 'high',
    totalStalls: 100,
    lat: 1.2805,
    lng: 103.8446,
    stalls: [
      { id: 's1', name: 'Ah Gong Chicken Rice', unitNumber: '#01-42', cuisine: 'Chinese', image: '🍗', dineInQueue: 12, takeawayQueue: 7, rating: 4.5, isOpen: true, menu: stallMenus.chickenRice },
      { id: 's2', name: 'Tian Tian Chicken Rice', unitNumber: '#01-10', cuisine: 'Chinese', image: '🍗', dineInQueue: 18, takeawayQueue: 9, rating: 4.7, isOpen: true, menu: stallMenus.chickenRice },
      { id: 's3', name: 'Laksa King', unitNumber: '#01-35', cuisine: 'Peranakan', image: '🥘', dineInQueue: 4, takeawayQueue: 5, rating: 4.3, isOpen: true, menu: stallMenus.laksa },
    ],
  },
  {
    id: 'hc2',
    name: 'Lau Pa Sat',
    address: '18 Raffles Quay, Singapore 048582',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600',
    dineInQueue: 18,
    takeawayQueue: 12,
    crowdLevel: 'medium',
    totalStalls: 80,
    lat: 1.2807,
    lng: 103.8503,
    stalls: [
      { id: 's4', name: 'Satay Street', unitNumber: '#01-01', cuisine: 'Malay', image: '🍢', dineInQueue: 8, takeawayQueue: 4, rating: 4.6, isOpen: true, menu: stallMenus.satay },
      { id: 's5', name: 'Indian Delights', unitNumber: '#01-15', cuisine: 'Indian', image: '🥘', dineInQueue: 5, takeawayQueue: 3, rating: 4.2, isOpen: true, menu: stallMenus.bakKutTeh },
      { id: 's6', name: 'Wok Hei Char Kway Teow', unitNumber: '#01-22', cuisine: 'Chinese', image: '🍜', dineInQueue: 5, takeawayQueue: 5, rating: 4.4, isOpen: true, menu: stallMenus.charKwayTeow },
    ],
  },
  {
    id: 'hc3',
    name: 'Old Airport Road Food Centre',
    address: '51 Old Airport Rd, Singapore 390051',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
    dineInQueue: 45,
    takeawayQueue: 28,
    crowdLevel: 'high',
    totalStalls: 168,
    lat: 1.3083,
    lng: 103.8858,
    stalls: [
      { id: 's7', name: 'Lor Mee 178', unitNumber: '#01-18', cuisine: 'Hokkien', image: '🍜', dineInQueue: 15, takeawayQueue: 8, rating: 4.5, isOpen: true, menu: stallMenus.laksa },
      { id: 's8', name: 'Carrot Cake Uncle', unitNumber: '#01-25', cuisine: 'Chinese', image: '🥮', dineInQueue: 10, takeawayQueue: 6, rating: 4.3, isOpen: true, menu: stallMenus.carrotCake },
      { id: 's9', name: 'Bak Kut Teh Legend', unitNumber: '#01-40', cuisine: 'Chinese', image: '🍖', dineInQueue: 12, takeawayQueue: 9, rating: 4.4, isOpen: true, menu: stallMenus.bakKutTeh },
      { id: 's10', name: 'Ice Desserts Corner', unitNumber: '#01-55', cuisine: 'Desserts', image: '🍧', dineInQueue: 8, takeawayQueue: 5, rating: 4.1, isOpen: true, menu: stallMenus.iceKachang },
    ],
  },
  {
    id: 'hc4',
    name: 'Tiong Bahru Market',
    address: '30 Seng Poh Rd, Singapore 168898',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    dineInQueue: 12,
    takeawayQueue: 5,
    crowdLevel: 'low',
    totalStalls: 83,
    lat: 1.2854,
    lng: 103.8339,
    stalls: [
      { id: 's11', name: 'Tiong Bahru Laksa', unitNumber: '#02-10', cuisine: 'Peranakan', image: '🥘', dineInQueue: 3, takeawayQueue: 2, rating: 4.0, isOpen: true, menu: stallMenus.laksa },
      { id: 's12', name: 'Traditional Bak Kut Teh', unitNumber: '#02-18', cuisine: 'Chinese', image: '🍖', dineInQueue: 5, takeawayQueue: 1, rating: 4.2, isOpen: true, menu: stallMenus.bakKutTeh },
      { id: 's13', name: 'Fresh Carrot Cake', unitNumber: '#02-05', cuisine: 'Chinese', image: '🥮', dineInQueue: 4, takeawayQueue: 2, rating: 4.5, isOpen: false, menu: stallMenus.carrotCake },
    ],
  },
];

export const sampleMenu: MenuItem[] = [
  { id: 'm1', name: 'Hainanese Chicken Rice', price: 4.50, category: 'Rice', image: '🍗', orderCount: 156 },
  { id: 'm2', name: 'Char Kway Teow', price: 5.00, category: 'Noodles', image: '🍜', orderCount: 142 },
  { id: 'm3', name: 'Laksa', price: 5.50, category: 'Noodles', image: '🥘', orderCount: 128 },
  { id: 'm4', name: 'Bak Kut Teh', price: 6.50, category: 'Soup', image: '🍖', orderCount: 98 },
  { id: 'm5', name: 'Satay (10 sticks)', price: 8.00, category: 'Grill', image: '🍢', orderCount: 167 },
  { id: 'm6', name: 'Hokkien Mee', price: 5.00, category: 'Noodles', image: '🍝', orderCount: 115 },
  { id: 'm7', name: 'Ice Kachang', price: 2.50, category: 'Dessert', image: '🍧', orderCount: 189 },
  { id: 'm8', name: 'Carrot Cake', price: 4.00, category: 'Snack', image: '🥮', orderCount: 103 },
  { id: 'm9', name: 'Roti Prata', price: 3.50, category: 'Snack', image: '🥞', orderCount: 134 },
  { id: 'm10', name: 'Sambal Stingray', price: 12.00, category: 'Seafood', image: '🐟', orderCount: 87 },
];

export const dailyEarnings: DailyEarning[] = [
  { date: 'Mon', cash: 420, banking: 680, total: 1100 },
  { date: 'Tue', cash: 380, banking: 590, total: 970 },
  { date: 'Wed', cash: 450, banking: 720, total: 1170 },
  { date: 'Thu', cash: 510, banking: 640, total: 1150 },
  { date: 'Fri', cash: 620, banking: 810, total: 1430 },
  { date: 'Sat', cash: 750, banking: 920, total: 1670 },
  { date: 'Sun', cash: 580, banking: 760, total: 1340 },
];

export const todaySummary = {
  totalEarnings: 1280.50,
  cashReceived: 520.00,
  bankingReceived: 760.50,
  totalOrders: 187,
  dineInOrders: 112,
  takeawayOrders: 75,
  popularItem: 'Ice Kachang',
  popularItemCount: 43,
  previousDayGrowth: 12.5,
};

export const incomingOrders: IncomingOrder[] = [
  {
    id: 'ord1', customerName: 'John Lim', items: [
      { name: 'Hainanese Chicken Rice', qty: 2, price: 4.50 },
      { name: 'Ice Kachang', qty: 1, price: 2.50 },
    ], total: 11.50, type: 'dine-in', status: 'pending', timestamp: '2 min ago', tableNumber: 'T5',
  },
  {
    id: 'ord2', customerName: 'Sarah Wong', items: [
      { name: 'Roasted Chicken Rice', qty: 1, price: 5.00 },
    ], total: 5.00, type: 'takeaway', status: 'pending', timestamp: '5 min ago',
  },
  {
    id: 'ord3', customerName: 'Mike Tan', items: [
      { name: 'Chicken Rice Set (with soup)', qty: 3, price: 6.50 },
      { name: 'Ice Kachang', qty: 2, price: 2.50 },
    ], total: 24.50, type: 'dine-in', status: 'pending', timestamp: '8 min ago', tableNumber: 'T12',
  },
  {
    id: 'ord4', customerName: 'Emily Chen', items: [
      { name: 'Hainanese Chicken Rice', qty: 1, price: 4.50 },
    ], total: 4.50, type: 'takeaway', status: 'accepted', timestamp: '15 min ago',
  },
  {
    id: 'ord5', customerName: 'David Koh', items: [
      { name: 'Roasted Chicken Rice', qty: 2, price: 5.00 },
      { name: 'Satay (10pcs)', qty: 1, price: 8.00 },
    ], total: 18.00, type: 'dine-in', status: 'completed', timestamp: '30 min ago', tableNumber: 'T3',
  },
];

export const sampleStall: Stall = {
  id: 's1',
  ownerId: 'u1',
  name: 'Ah Gong Chicken Rice',
  hawkerCenterId: 'hc1',
  unitNumber: '#01-42',
  cuisine: 'Chinese',
  menu: sampleMenu,
  operatingHours: '10:00 AM - 8:00 PM (Closed Mondays)',
  description: 'Authentic Hainanese chicken rice passed down 3 generations. Our secret family recipe has been delighting customers since 1975.',
};

export const sampleUsers: User[] = [
  { id: 'u1', email: 'owner@hawker.com', password: 'owner123', name: 'Ah Gong', role: 'owner', stallId: 's1' },
  { id: 'u2', email: 'customer@test.com', password: 'customer123', name: 'Jane Tan', role: 'customer' },
];

export function getStallsByCenter(centerId: string): StallInCenter[] {
  const center = hawkerCenters.find((h) => h.id === centerId);
  return center?.stalls ?? [];
}
