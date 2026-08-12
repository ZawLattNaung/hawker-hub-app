import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function CustomerProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Account & partner benefits</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-blue-100 text-sm">Customer</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <dl className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Account ID</dt>
              <dd className="text-sm font-medium text-gray-800">#HAW-{user?.id?.toUpperCase()}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Total Orders</dt>
              <dd className="text-sm font-medium text-gray-800">47</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Member Since</dt>
              <dd className="text-sm font-medium text-gray-800">January 2026</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Partner Company Badge */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">PARTNER</span>
              <span className="text-white/90 text-xs">Corporate Partnership</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">🏢 {user?.partnerCompany}</h3>
            <p className="text-amber-100 text-sm">
              Employees of partner companies get exclusive priority benefits.
            </p>
          </div>
          <div className="text-5xl">🏢</div>
        </div>
      </div>

      {/* Priority Queue Status */}
      {user?.priorityQueue && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-lg mb-1">Priority Queue Active</h3>
              <p className="text-green-700 text-sm mb-3">
                As a {user.partnerCompany} employee, your orders are prioritized. You skip ahead of the regular queue.
              </p>
              <div className="flex gap-3 flex-wrap">
                <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                  <p className="text-xs text-green-500">Queue Boost</p>
                  <p className="text-green-800 font-bold text-lg">2x Faster</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                  <p className="text-xs text-green-500">Priority</p>
                  <p className="text-green-800 font-bold text-lg">Level 1</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                  <p className="text-xs text-green-500">Discount</p>
                  <p className="text-green-800 font-bold text-lg">5% Off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partner Companies List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Our Partner Companies</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Shopee Singapore', icon: '🛍️', employees: '5,000+' },
            { name: 'Grab Holdings', icon: '🚗', employees: '3,200+' },
            { name: 'DBS Bank', icon: '🏦', employees: '8,000+' },
            { name: 'GovTech Singapore', icon: '🏛️', employees: '2,500+' },
          ].map((company) => (
            <div key={company.name} className={`rounded-xl p-3 border ${
              company.name === user?.partnerCompany
                ? 'border-amber-300 bg-amber-50'
                : 'border-gray-100 bg-gray-50'
            }`}>
              <p className="text-lg mb-1">{company.icon}</p>
              <p className="text-xs font-semibold text-gray-800">{company.name}</p>
              <p className="text-[10px] text-gray-400">{company.employees} employees</p>
              {company.name === user?.partnerCompany && (
                <span className="inline-block bg-amber-200 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">
                  YOU
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/customer"
        className="block text-center text-orange-600 hover:underline text-sm"
      >
        ← Back to browse centres
      </Link>
    </div>
  );
}
