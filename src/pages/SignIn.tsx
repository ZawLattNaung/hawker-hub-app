import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'customer'>('customer');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const ok = login(email, password, role);
    if (ok) {
      navigate(role === 'owner' ? '/owner/dashboard' : '/customer');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-red-600 items-center justify-center p-12">
        <div className="text-white text-center max-w-md">
          <h1 className="text-6xl mb-4">🍜</h1>
          <h2 className="text-4xl font-bold mb-4">HawkerHub</h2>
          <p className="text-xl opacity-90">
            Your one-stop platform connecting hawker owners with hungry customers across Singapore.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm">Hawker Centres</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-3xl font-bold">5k+</p>
              <p className="text-sm">Daily Orders</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-3xl font-bold">Live</p>
              <p className="text-sm">Queue Tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Sign in to your account</p>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            {(['customer', 'owner'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition ${
                  role === r ? 'bg-white shadow text-orange-600' : 'text-gray-500'
                }`}
              >
                {r === 'owner' ? '🏪 Hawker Owner' : '👤 Customer'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder={role === 'owner' ? 'owner@hawker.com' : 'customer@test.com'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder={role === 'owner' ? 'owner123' : 'customer123'}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 hover:underline font-medium">Sign up</Link>
          </p>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            <strong>Demo Credentials:</strong><br />
            Owner: owner@hawker.com / owner123<br />
            Customer: customer@test.com / customer123
          </div>
        </div>
      </div>
    </div>
  );
}
