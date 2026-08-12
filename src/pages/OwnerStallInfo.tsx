import { useState } from 'react';
import { sampleStall, hawkerCenters } from '../data/mockData';

export default function OwnerStallInfo() {
  const [stall, setStall] = useState(sampleStall);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: stall.name,
    unitNumber: stall.unitNumber,
    cuisine: stall.cuisine,
    operatingHours: stall.operatingHours,
    description: stall.description,
  });

  const center = hawkerCenters.find((h) => h.id === stall.hawkerCenterId);

  const save = () => {
    setStall({ ...stall, ...form });
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Stall</h1>
        <p className="text-gray-500">Manage your stall information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stall Preview Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-24" />
            <div className="p-6 -mt-8">
              <div className="w-16 h-16 bg-white rounded-xl shadow flex items-center justify-center text-3xl mb-4">
                🍚
              </div>
              <h2 className="text-xl font-bold text-gray-900">{stall.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {center?.name} - {stall.unitNumber}
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">🍳</span>
                  <span className="text-gray-600">{stall.cuisine}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">🕐</span>
                  <span className="text-gray-600">{stall.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">📋</span>
                  <span className="text-gray-600">{stall.menu.length} menu items</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Stall Details</h3>
              {!editing ? (
                <button
                  onClick={() => { setEditing(true); setForm({ name: stall.name, unitNumber: stall.unitNumber, cuisine: stall.cuisine, operatingHours: stall.operatingHours, description: stall.description }); }}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={save} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition">Save</button>
                  <button onClick={() => setEditing(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm transition">Cancel</button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stall Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                    <input
                      value={form.unitNumber}
                      onChange={(e) => setForm({ ...form, unitNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
                    <input
                      value={form.cuisine}
                      onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                  <input
                    value={form.operatingHours}
                    onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                  />
                </div>
              </div>
            ) : (
              <dl className="space-y-4">
                {[
                  ['Stall Name', stall.name],
                  ['Unit Number', stall.unitNumber],
                  ['Cuisine', stall.cuisine],
                  ['Operating Hours', stall.operatingHours],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <dt className="text-sm text-gray-500">{label}</dt>
                    <dd className="text-sm font-medium text-gray-800">{value}</dd>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700">{stall.description}</p>
                </div>
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
