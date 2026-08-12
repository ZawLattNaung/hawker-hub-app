import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'owner' | 'customer') => {
    loginAs(role);
    navigate(role === 'owner' ? '/owner/dashboard' : '/customer');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 sm:p-16 text-center text-white">
        <h1 className="text-6xl sm:text-7xl mb-4">🍜</h1>
        <h2 className="text-3xl sm:text-5xl font-bold mb-3">HawkerGo</h2>
        <p className="text-lg sm:text-xl opacity-90 max-w-md mx-auto">
          Singapore's smart hawker centre platform — skip the queues, manage your stall.
        </p>
        <div className="flex justify-center gap-4 sm:gap-6 mt-8">
          <div className="bg-white/20 rounded-xl px-4 sm:px-6 py-3">
            <p className="text-2xl sm:text-3xl font-bold">100+</p>
            <p className="text-xs sm:text-sm opacity-80">Hawker Centres</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 sm:px-6 py-3">
            <p className="text-2xl sm:text-3xl font-bold">5k+</p>
            <p className="text-xs sm:text-sm opacity-80">Daily Orders</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 sm:px-6 py-3">
            <p className="text-2xl sm:text-3xl font-bold">Live</p>
            <p className="text-xs sm:text-sm opacity-80">Queue Tracking</p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex-1 flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-md">
          <h3 className="text-center text-gray-500 text-sm mb-8">Choose your role to continue</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer */}
            <button
              onClick={() => handleRoleSelect('customer')}
              className="group bg-white border-2 border-blue-200 hover:border-blue-500 rounded-2xl p-6 sm:p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer</h3>
              <p className="text-sm text-gray-500 mb-4">
                Browse hawker centres, check live queues, order food & skip the wait.
              </p>
              <span className="inline-block bg-blue-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl group-hover:bg-blue-600 transition">
                Enter as Customer
              </span>
            </button>

            {/* Owner */}
            <button
              onClick={() => handleRoleSelect('owner')}
              className="group bg-white border-2 border-orange-200 hover:border-orange-500 rounded-2xl p-6 sm:p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hawker Owner</h3>
              <p className="text-sm text-gray-500 mb-4">
                Manage orders, track earnings, update menu & monitor your stall's performance.
              </p>
              <span className="inline-block bg-orange-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl group-hover:bg-orange-600 transition">
                Enter as Owner
              </span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Prototype · No login required
          </p>
        </div>
      </div>
    </div>
  );
}
