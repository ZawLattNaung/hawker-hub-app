import { useState } from 'react';
import { sampleMenu } from '../data/mockData';
import type { MenuItem } from '../types';

export default function OwnerMenu() {
  const [menu, setMenu] = useState<MenuItem[]>(sampleMenu);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', price: 0, category: '', image: '🍽️' });

  const totalOrders = menu.reduce((s, i) => s + i.orderCount, 0);

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({ name: item.name, price: item.price, category: item.category, image: item.image });
    setShowAdd(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', price: 0, category: '', image: '🍽️' });
    setShowAdd(true);
  };

  const save = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setMenu(menu.map((m) => (m.id === editing.id ? { ...m, ...form } : m)));
    } else {
      setMenu([...menu, { id: `m${Date.now()}`, ...form, orderCount: 0 }]);
    }
    setShowAdd(false);
    setEditing(null);
  };

  const deleteItem = (id: string) => {
    setMenu(menu.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Editor</h1>
          <p className="text-gray-500">{menu.length} items · {totalOrders} total orders</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          + Add Item
        </button>
      </div>

      {/* Add / Edit Form */}
      {(showAdd || editing) && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Item' : 'Add New Item'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price || ''}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              placeholder="Emoji"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              {editing ? 'Save Changes' : 'Add to Menu'}
            </button>
            <button
              onClick={() => { setShowAdd(false); setEditing(null); }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Menu List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500">
              <th className="px-6 py-3 font-medium">Item</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Orders</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {menu.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${item.orderCount > 150 ? 'text-green-600' : 'text-gray-500'}`}>
                    {item.orderCount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
