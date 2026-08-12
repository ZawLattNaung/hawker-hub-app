import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const ownerNav = [
    { path: '/owner/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/owner/menu', label: 'Menu', icon: '📋' },
    { path: '/owner/stall', label: 'My Stall', icon: '🏪' },
  ];

  const customerNav = [
    { path: '/customer', label: 'Explore', icon: '🔍' },
  ];

  const navItems = user?.role === 'owner' ? ownerNav : customerNav;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Top Nav */}
      <nav className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl shrink-0">
              <span>🍜</span>
              <span>HawkerGo</span>
            </Link>

            {/* Desktop Nav */}
            {user && (
              <div className="hidden md:flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`hover:text-orange-200 transition ${isActive(item.path) ? 'text-white font-semibold' : 'text-orange-100'}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <span className="text-sm text-orange-200">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-700 hover:bg-orange-800 px-3 py-1.5 rounded text-sm transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            {user && (
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 hover:bg-orange-700 rounded-lg transition"
              >
                {mobileMenu ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenu && user && (
          <div className="md:hidden border-t border-orange-500 bg-orange-600">
            <div className="px-4 py-2">
              <p className="text-sm text-orange-200 mb-2">👋 {user.name}</p>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={`block py-2.5 px-3 rounded-lg mb-1 transition ${
                    isActive(item.path) ? 'bg-orange-700 text-white font-medium' : 'text-orange-100 hover:bg-orange-700/50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { handleLogout(); setMobileMenu(false); }}
                className="w-full text-left py-2.5 px-3 rounded-lg text-orange-100 hover:bg-orange-700/50 transition mt-1"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex items-center justify-around h-14">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-lg transition ${
                  isActive(item.path) ? 'text-orange-600' : 'text-gray-400'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-gray-400"
            >
              <span className="text-xl">🚪</span>
              <span className="text-[10px] font-medium">Logout</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
