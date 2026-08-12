import { useState } from 'react';
import { incomingOrders, todaySummary } from '../data/mockData';
import type { IncomingOrder } from '../types';

const statusConfig = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
  accepted: { bg: 'bg-green-100', text: 'text-green-700', label: 'Accepted' },
  declined: { bg: 'bg-red-100', text: 'text-red-700', label: 'Declined' },
  'sold-out': { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Sold Out' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Completed' },
};

export default function OwnerOrders() {
  const [orders, setOrders] = useState<IncomingOrder[]>(incomingOrders);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

  const updateStatus = (id: string, status: IncomingOrder['status']) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incoming Orders</h1>
          <p className="text-gray-500">
            {pendingCount} order{pendingCount !== 1 ? 's' : ''} waiting · {todaySummary.totalOrders} total today
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'pending', 'accepted', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'pending' && pendingCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.map((order) => {
          const cfg = statusConfig[order.status];
          const isPending = order.status === 'pending';

          return (
            <div
              key={order.id}
              className={`bg-white rounded-xl shadow-sm border p-4 sm:p-6 transition ${
                isPending ? 'border-orange-200 ring-1 ring-orange-100' : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-gray-400">{order.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {order.type === 'dine-in' ? '🍽️ Dine-in' : '🥡 Takeaway'}
                    </span>
                    {order.tableNumber && (
                      <span className="text-xs text-gray-500">Table: {order.tableNumber}</span>
                    )}
                    <span className="text-xs font-medium text-gray-400">#{order.id}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{order.items.reduce((s, i) => s + i.qty, 0)} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="space-y-1.5">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.qty}x {item.name}
                      </span>
                      <span className="text-gray-500">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons for pending orders */}
              {isPending && (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateStatus(order.id, 'accepted')}
                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    ✓ Accept Order
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, 'declined')}
                    className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    ✕ Decline
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, 'sold-out')}
                    className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    📦 Sold Out
                  </button>
                </div>
              )}

              {order.status === 'accepted' && (
                <button
                  onClick={() => updateStatus(order.id, 'completed')}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  ✓ Mark as Completed
                </button>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-2">📭</p>
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
