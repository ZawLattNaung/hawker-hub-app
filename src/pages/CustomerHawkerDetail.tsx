import { useParams, Link } from 'react-router-dom';
import { hawkerCenters } from '../data/mockData';

const crowdConfig = {
  low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Low Crowd' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium Crowd' },
  high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High Crowd' },
};

export default function CustomerHawkerDetail() {
  const { id } = useParams<{ id: string }>();
  const center = hawkerCenters.find((h) => h.id === id);

  if (!center) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🍜</p>
        <p className="text-gray-500">Hawker centre not found</p>
        <Link to="/customer" className="text-orange-600 hover:underline mt-4 inline-block">Back to all centres</Link>
      </div>
    );
  }

  const cfg = crowdConfig[center.crowdLevel];
  const totalQueue = center.dineInQueue + center.takeawayQueue;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back */}
      <Link to="/customer" className="text-sm text-gray-500 hover:text-orange-600 transition mb-6 inline-block">
        ← Back to all centres
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 mb-6">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${center.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-white mb-1">{center.name}</h1>
          <p className="text-white/80 text-sm sm:text-base">{center.address}</p>
        </div>
      </div>

      {/* Crowd Status Banner */}
      <div className={`${cfg.bg} rounded-xl p-4 sm:p-6 mb-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</p>
            <p className="text-sm text-gray-600 mt-1">
              {center.crowdLevel === 'high'
                ? 'Expect 20-30 min wait. Consider takeaway or visit during off-peak.'
                : center.crowdLevel === 'medium'
                ? 'Moderate wait times. Good time to visit!'
                : 'Queues are short. Get your food fast!'}
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-3xl font-bold text-gray-800">{totalQueue}</p>
            <p className="text-sm text-gray-500">total in queue</p>
          </div>
        </div>
      </div>

      {/* Queue Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dine-In Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">🍽️ Dine-In Queue</h3>
            <span className="text-2xl font-bold text-orange-600">{center.dineInQueue}</span>
          </div>
          <div className="space-y-3">
            {Array.from({ length: Math.min(center.dineInQueue, 8) }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-lg"
                    style={{ width: `${100 - i * 8}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">~{Math.max(3, 15 - i)} min</span>
              </div>
            ))}
            {center.dineInQueue > 8 && (
              <p className="text-sm text-gray-400 text-center pt-2">
                + {center.dineInQueue - 8} more in queue
              </p>
            )}
            {center.dineInQueue === 0 && (
              <p className="text-green-600 text-sm">No queue! Walk right in.</p>
            )}
          </div>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-sm font-medium text-orange-800">Estimated wait: {Math.max(5, center.dineInQueue * 2)} min</p>
          </div>
        </div>

        {/* Takeaway Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">🥡 Takeaway Queue</h3>
            <span className="text-2xl font-bold text-purple-600">{center.takeawayQueue}</span>
          </div>
          <div className="space-y-3">
            {Array.from({ length: Math.min(center.takeawayQueue, 8) }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg h-2">
                  <div
                    className="bg-purple-400 h-2 rounded-lg"
                    style={{ width: `${100 - i * 8}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">~{Math.max(2, 10 - i)} min</span>
              </div>
            ))}
            {center.takeawayQueue > 8 && (
              <p className="text-sm text-gray-400 text-center pt-2">
                + {center.takeawayQueue - 8} more in queue
              </p>
            )}
            {center.takeawayQueue === 0 && (
              <p className="text-green-600 text-sm">No queue! Order right away.</p>
            )}
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-800">Estimated wait: {Math.max(3, center.takeawayQueue * 1.5)} min</p>
          </div>
        </div>
      </div>

      {/* Stall Count */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Stall Information</h3>
            <p className="text-sm text-gray-500">{center.totalStalls} food stalls operating in this centre</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-2xl">🍜</span>
          </div>
        </div>
      </div>
    </div>
  );
}
