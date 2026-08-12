import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hawkerCenters } from '../data/mockData';
import type { CartItem, MenuItem, StallInCenter } from '../types';
import { useAuth } from '../contexts/AuthContext';

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

function QuickPayModal({
  item,
  stall,
  onClose,
}: {
  item: MenuItem;
  stall: StallInCenter;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [qty, setQty] = useState(1);
  const [method, setMethod] = useState<'paynow' | 'card' | 'cash'>('paynow');
  const [paid, setPaid] = useState(false);
  const total = item.price * qty;

  if (paid) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Order Placed!</h3>
          <p className="text-sm text-gray-500 mb-2">
            {qty}x {item.name} from {stall.name}
          </p>
          <p className="text-lg font-bold text-gray-800 mb-1">${total.toFixed(2)}</p>
          {user?.priorityQueue && (
            <div className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-lg inline-block mb-4">
              ⚡ Priority Queue — ~5 min wait
            </div>
          )}
          {!user?.priorityQueue && (
            <p className="text-xs text-gray-400 mb-4">Estimated wait: ~15 min</p>
          )}
          <button
            onClick={onClose}
            className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-xl font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900">Quick Order</h3>
            <p className="text-xs text-gray-400">{stall.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Item Info */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 mb-4">
          <span className="text-3xl">{item.image}</span>
          <div className="flex-1">
            <p className="font-medium text-gray-800 text-sm">{item.name}</p>
            <p className="text-sm font-bold text-orange-600">${item.price.toFixed(2)} each</p>
          </div>
        </div>

        {/* Qty */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Quantity</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg transition"
            >
              −
            </button>
            <span className="text-lg font-bold w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center text-lg transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3 mb-4">
          <span className="text-sm font-medium text-gray-700">Total</span>
          <span className="text-xl font-bold text-orange-600">${total.toFixed(2)}</span>
        </div>

        {/* Priority info */}
        {user?.priorityQueue && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 mb-4 text-sm text-green-700">
            ⚡ Priority queue — your order jumps ahead
          </div>
        )}

        {/* Payment Method */}
        <p className="text-xs text-gray-500 mb-2">Payment Method</p>
        <div className="space-y-2 mb-4">
          {([
            { id: 'paynow' as const, label: 'PayNow', icon: '📱' },
            { id: 'card' as const, label: 'Card', icon: '💳' },
            { id: 'cash' as const, label: 'Cash at Stall', icon: '💵' },
          ]).map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left text-sm transition ${
                method === m.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{m.icon}</span>
              <span className="font-medium text-gray-800">{m.label}</span>
              {method === m.id && <span className="ml-auto text-orange-600">●</span>}
            </button>
          ))}
        </div>

        {method === 'paynow' && (
          <div className="text-center bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Scan to Pay</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=HAWKERGO-PAYNOW-${total.toFixed(2)}-${Date.now()}`}
              alt="PayNow QR"
              className="w-[140px] h-[140px] mx-auto rounded-lg"
            />
            <p className="text-xs font-bold text-gray-800 mt-2">${total.toFixed(2)}</p>
          </div>
        )}

        {method === 'card' && (
          <div className="space-y-2 bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="MM/YY" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
              <input type="text" placeholder="CVV" className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
            </div>
          </div>
        )}

        <button
          onClick={() => setPaid(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition"
        >
          Confirm & Pay ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default function CustomerHawkerDetail() {
  const { id } = useParams<{ id: string }>();
  const center = hawkerCenters.find((h) => h.id === id);
  const [expandedStall, setExpandedStall] = useState<string | null>(null);
  const [addedMsg, setAddedMsg] = useState('');
  const [payItem, setPayItem] = useState<{ item: MenuItem; stall: StallInCenter } | null>(null);

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

  const handleAddToCart = (stall: StallInCenter, menuItem: MenuItem) => {
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
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-40 text-sm font-medium animate-bounce">
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
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-2xl shrink-0">{item.image}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.orderCount} ordered today</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3 shrink-0">
                        <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">${item.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleAddToCart(stall, item)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm transition"
                          title="Add to cart"
                        >
                          +
                        </button>
                        <button
                          onClick={() => setPayItem({ item, stall })}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap"
                        >
                          Pay Now
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

      {/* Quick Pay Modal */}
      {payItem && (
        <QuickPayModal
          item={payItem.item}
          stall={payItem.stall}
          onClose={() => setPayItem(null)}
        />
      )}
    </div>
  );
}
