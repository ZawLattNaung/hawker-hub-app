import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'customer'>('customer');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    signup(name, email, password, role);
    navigate(role === 'owner' ? '/owner/dashboard' : '/customer');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Hero Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-red-600 items-center justify-center p-12">
        <div className="text-white text-center max-w-md">
          <h1 className="text-6xl mb-4">🍜</h1>
          <h2 className="text-4xl font-bold mb-4">Join HawkerGo</h2>
          <p className="text-xl opacity-90">
            {role === 'owner'
              ? 'Manage your stall, track earnings, and grow your hawker business.'
              : 'Skip the queue misery. Find the best hawker food without the wait.'}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-4xl mb-2">🍜</h1>
            <h2 className="text-2xl font-bold text-gray-900">HawkerGo</h2>
            <p className="text-sm text-gray-500 mt-1">Join the community today</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Create account</h2>
          <p className="text-gray-500 mb-6">Get started with HawkerGo</p>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            {(['customer', 'owner'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-md text-xs sm:text-sm font-medium transition ${
                  role === r ? 'bg-white shadow text-orange-600' : 'text-gray-500'
                }`}
              >
                {r === 'owner' ? '🏪 Owner' : '👤 Customer'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-base"
                placeholder={role === 'owner' ? 'e.g. Ah Gong' : 'e.g. Jane Tan'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-base"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-base"
                placeholder="Min. 6 characters"
              />
            </div>
            {role === 'owner' && (
              <div className="p-3 bg-orange-50 rounded-lg text-sm text-orange-700">
                You'll be able to set up your stall details after signing up.
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3.5 rounded-lg transition text-base"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-orange-600 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
