import { useState } from 'react';
import { Link } from 'react-router-dom';
import { hawkerCenters } from '../data/mockData';
import type { CartItem, MenuItem } from '../types';

function getCartFromStorage(): CartItem[] {
  try {
    const saved = localStorage.getItem('hawkergo_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  localStorage.setItem('hawkergo_cart', JSON.stringify(items));
}

export default function CustomerPayment() {
  const [cart, setCart] = useState<CartItem[]>(getCartFromStorage);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paynow' | 'card' | 'cash'>('paynow');
  const [paid, setPaid] = useState(false);

  const updateQty = (stallId: string, itemId: string, delta: number) => {
    const updated = cart.map((c) => {
      if (c.stallId === stallId && c.menuItem.id === itemId) {
        const newQty = c.qty + delta;
        return newQty <= 0 ? null : { ...c, qty: newQty };
      }
      return c;
    }).filter(Boolean) as CartItem[];
    setCart(updated);
    saveCartToStorage(updated);
  };

  const removeItem = (stallId: string, itemId: string) => {
    const updated = cart.filter((c) => !(c.stallId === stallId && c.menuItem.id === itemId));
    setCart(updated);
    saveCartToStorage(updated);
  };

  const subtotal = cart.reduce((s, c) => s + c.menuItem.price * c.qty, 0);
  const gst = subtotal * 0.09;
  const total = subtotal + gst;

  const addDemoItem = (menuItem: MenuItem, stallName: string, stallId: string) => {
    const existing = cart.find((c) => c.stallId === stallId && c.menuItem.id === menuItem.id);
    if (existing) {
      updateQty(stallId, menuItem.id, 1);
    } else {
      const updated = [...cart, { menuItem, qty: 1, stallName, stallId }];
      setCart(updated);
      saveCartToStorage(updated);
    }
  };

  if (paid) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-2">Your order has been placed</p>
        <p className="text-sm text-gray-400 mb-8">Estimated wait: 15-20 min</p>
        <div className="bg-green-50 rounded-xl p-4 mb-8">
          <p className="text-sm text-green-700">Order #HAW{Date.now().toString(36).toUpperCase()}</p>
          <p className="text-xs text-green-500 mt-1">You'll be notified when your food is ready</p>
        </div>
        <button
          onClick={() => { setPaid(false); setShowPayment(false); setCart([]); saveCartToStorage([]); }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition"
        >
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>
        <p className="text-gray-500">Review your order and pay</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <p className="text-sm text-gray-400 mb-6">Add items from a stall to get started</p>

          {/* Demo: Quick add */}
          <div className="max-w-md mx-auto">
            <p className="text-xs font-medium text-gray-500 mb-3 uppercase">Quick Add Demo Items</p>
            <div className="space-y-2">
              {hawkerCenters.slice(0, 3).flatMap((hc) =>
                hc.stalls.slice(0, 1).flatMap((stall) =>
                  stall.menu.slice(0, 2).map((item) => (
                    <button
                      key={`${stall.id}-${item.id}`}
                      onClick={() => addDemoItem(item, stall.name, stall.id)}
                      className="w-full text-left bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-300 hover:shadow-sm transition flex justify-between items-center"
                    >
                      <div>
                        <span className="text-sm font-medium text-gray-800">{item.image} {item.name}</span>
                        <p className="text-xs text-gray-400">{stall.name} · {hc.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-orange-600">${item.price.toFixed(2)}</span>
                    </button>
                  ))
                )
              )}
            </div>
          </div>

          <Link to="/customer" className="text-orange-600 hover:underline text-sm mt-6 inline-block">
            ← Browse hawker centres
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.stallId}-${item.menuItem.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
                <span className="text-3xl">{item.menuItem.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{item.menuItem.name}</p>
                  <p className="text-xs text-gray-400">{item.stallName}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">${item.menuItem.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.stallId, item.menuItem.id, -1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.stallId, item.menuItem.id, 1)}
                    className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center text-sm transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.stallId, item.menuItem.id)}
                  className="text-red-400 hover:text-red-600 text-sm ml-2"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (9%)</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {!showPayment ? (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition"
                >
                  Proceed to Payment
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">Payment Method</p>
                  <div className="space-y-2">
                    {([
                      { id: 'paynow' as const, label: 'PayNow', icon: '📱' },
                      { id: 'card' as const, label: 'Credit / Debit Card', icon: '💳' },
                      { id: 'cash' as const, label: 'Pay at Stall (Cash)', icon: '💵' },
                    ]).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition ${
                          paymentMethod === m.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl">{m.icon}</span>
                        <span className="text-sm font-medium text-gray-800">{m.label}</span>
                        {paymentMethod === m.id && <span className="ml-auto text-orange-600">●</span>}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPaid(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition mt-2"
                  >
                    Pay ${total.toFixed(2)}
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
