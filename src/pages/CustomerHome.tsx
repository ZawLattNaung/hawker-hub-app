import { useState } from 'react';
import { Link } from 'react-router-dom';
import { hawkerCenters } from '../data/mockData';
import type { HawkerCenter } from '../types';

const crowdConfig = {
  low: { color: 'bg-green-100 text-green-700', bar: 'bg-green-500', label: 'Low Crowd', width: 'w-1/3' },
  medium: { color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500', label: 'Medium Crowd', width: 'w-2/3' },
  high: { color: 'bg-red-100 text-red-700', bar: 'bg-red-500', label: 'High Crowd', width: 'w-full' },
};

function HawkerCard({ center }: { center: HawkerCenter }) {
  const cfg = crowdConfig[center.crowdLevel];

  return (
    <Link
      to={`/customer/${center.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all block"
    >
      <div className="h-40 bg-gray-200 relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${center.image})` }}
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-white font-bold text-lg">{center.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-3">{center.address}</p>

        {/* Crowd Meter */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Crowd Level</span>
            <span>{center.dineInQueue + center.takeawayQueue} in queue</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className={`${cfg.bar} ${cfg.width} h-2 rounded-full transition-all`} />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-4">
            <span className="text-gray-600">🍽️ <strong>{center.dineInQueue}</strong> dine-in</span>
            <span className="text-gray-600">🥡 <strong>{center.takeawayQueue}</strong> takeaway</span>
          </div>
          <span className="text-gray-400">{center.totalStalls} stalls</span>
        </div>
      </div>
    </Link>
  );
}

export default function CustomerHome() {
  const [search, setSearch] = useState('');
  const [crowdFilter, setCrowdFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filtered = hawkerCenters.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCrowd = crowdFilter === 'all' || c.crowdLevel === crowdFilter;
    return matchSearch && matchCrowd;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hawker Centres in Singapore</h1>
        <p className="text-gray-500">Find the best food, skip the long queues</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search hawker centres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setCrowdFilter(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                crowdFilter === level
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level === 'all' ? 'All' : crowdConfig[level].label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((center) => (
          <HawkerCard key={center.id} center={center} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-2">🍜</p>
          <p>No hawker centres found</p>
        </div>
      )}
    </div>
  );
}
