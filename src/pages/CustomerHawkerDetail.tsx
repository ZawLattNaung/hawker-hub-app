import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hawkerCenters } from '../data/mockData';
import type { CartItem } from '../types';

const crowdConfig = {
  low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Low Crowd' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium Crowd' },
  high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High Crowd' },
};

function addToCart(item: CartItem) {
  try {
    const saved = localStorage.getItem('hawkergo_cart');
    const cart: CartItem[] = saved ? JSON.parse(saved) : [];
    const existing = cart.find((c) => c.stallId === item.stallId && c.menuItem.id === item.menuItem.id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push(item);
    }
    localStorage.setItem('hawkergo_cart', JSON.stringify(cart));
  } catch { /* ignore */ }
}

export default function CustomerHawkerDetail() {
  const { id } = useParams<{ id: string }>();
  const center = hawkerCenters.find((h) => h.id === id);
  const [expandedStall, setExpandedStall] = useState<string | null>(null);
  const [addedMsg, setAddedMsg] = useState('');

  if (!center) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🍜</p>
        <p className="text-gray-500">Hawker centre not found</p>
        <Link to="/customer" className="text-orange-600 hover:underline mt-4 inline-block">← Back to all centres</Link>
      </div>
    );
  }

  const cfg = crowdConfig[center.crowdLevel];
  const totalDineIn = center.stalls.reduce((s, st) => s + st.dineInQueue, 0);
  const totalTakeaway = center.stalls.reduce((s, st) => s + st.takeawayQueue, 0);
  const totalQueue = totalDineIn + totalTakeaway;

  const handleAddToCart = (stall: typeof center.stalls[0], menuItem: typeof stall.menu[0]) => {
    addToCart({
      menuItem,
      qty: 1,
      stallName: stall.name,
      stallId: stall.id,
    });
    setAddedMsg(`${menuItem.name} added!`);
    setTimeout(() => setAddedMsg(''), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <Link to="/customer" className="text-sm text-gray-500 hover:text-orange-600 transition mb-4 inline-block">
        ← Back to all centres
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-40 sm:h-56 mb-6">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${center.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">{center.name}</h1>
          <p className="text-white/80 text-xs sm:text-sm">{center.address}</p>
        </div>
      </div>

      {/* Crowd Status Banner */}
      <div className={`${cfg.bg} rounded-xl p-3 sm:p-5 mb-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className={`text-base sm:text-lg font-bold ${cfg.color}`}>{cfg.label}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              {center.crowdLevel === 'high'
                ? 'Many people here right now. Takeaway might be faster.'
                : center.crowdLevel === 'medium'
                ? 'Moderate crowd. Good time to visit!'
                : 'Queues are short. Get your food fast!'}
            </p>
          </div>
          <div className="flex gap-4 sm:text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalQueue}</p>
              <p className="text-xs text-gray-500">total queue</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{center.stalls.length}</p>
              <p className="text-xs text-gray-500">stalls</p>
            </div>
          </div>
        </div>
      </div>

      {/* Added to cart toast */}
      {addedMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50 text-sm font-medium animate-bounce">
          ✓ {addedMsg}
        </div>
      )}

      {/* Stalls List */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">Stalls in this Centre</h2>
      <div className="space-y-4">
        {center.stalls.map((stall) => (
          <div
            key={stall.id}
            className={`bg-white rounded-xl shadow-sm border transition ${
              stall.isOpen ? 'border-gray-100' : 'border-gray-100 opacity-60'
            } overflow-hidden`}
          >
            {/* Stall Header */}
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{stall.image}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{stall.name}</h3>
                    <p className="text-xs text-gray-400">
                      {stall.unitNumber} · {stall.cuisine}
                      {!stall.isOpen && <span className="text-red-500 ml-2">Closed</span>}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-yellow-500 text-xs">{'★'.repeat(Math.floor(stall.rating))}</span>
                      <span className="text-xs text-gray-400">{stall.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Queue indicators */}
                <div className="flex gap-3 text-center shrink-0">
                  <div>
                    <p className="text-lg font-bold text-orange-600">{stall.dineInQueue}</p>
                    <p className="text-[10px] text-gray-400">Dine-in</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-600">{stall.takeawayQueue}</p>
                    <p className="text-[10px] text-gray-400">Takeaway</p>
                  </div>
                </div>
              </div>

              {/* Order Now Button */}
              {stall.isOpen && (
                <button
                  onClick={() => setExpandedStall(expandedStall === stall.id ? null : stall.id)}
                  className="mt-3 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  {expandedStall === stall.id ? 'Close Menu' : '📋 Order from this Stall'}
                </button>
              )}
            </div>

            {/* Expanded Menu */}
            {expandedStall === stall.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Menu</p>
                <div className="space-y-2">
                  {stall.menu.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.orderCount} ordered today</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleAddToCart(stall, item)}
                          className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg transition shrink-0"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
