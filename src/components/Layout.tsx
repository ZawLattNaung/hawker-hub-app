import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface NavTab {
  label: string;
  icon: string;
  path: string;
  description: string;
}

const allOwnerTabs: NavTab[] = [
  { label: 'Dashboard', icon: '📊', path: '/owner/dashboard', description: 'Today\'s earnings, charts & menu popularity' },
  { label: 'Incoming Orders', icon: '📥', path: '/owner/orders', description: 'Accept or decline customer orders' },
  { label: 'Menu Editor', icon: '📋', path: '/owner/menu', description: 'Add, edit or remove menu items' },
  { label: 'My Stall Info', icon: '🏪', path: '/owner/stall', description: 'Update stall details & operating hours' },
];

const allCustomerTabs: NavTab[] = [
  { label: 'Browse Centres', icon: '🔍', path: '/customer', description: 'See all hawker centres with live queues' },
  { label: 'My Cart', icon: '🛒', path: '/customer/cart', description: 'View and pay for your orders' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const tabs = user?.role === 'owner' ? allOwnerTabs : allCustomerTabs;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Top Nav */}
      <nav className="bg-orange-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-3">
              {/* Menu Drawer Toggle */}
              {user && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="p-2 hover:bg-orange-700 rounded-lg transition"
                  title="Open menu bar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl shrink-0">
                <span>🍜</span>
                <span>HawkerGo</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            {user && (
              <div className="hidden md:flex items-center gap-4">
                {tabs.slice(0, 4).map((tab) => (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`hover:text-orange-200 transition text-sm ${isActive(tab.path) ? 'text-white font-semibold' : 'text-orange-100'}`}
                  >
                    {tab.label}
                  </Link>
                ))}
                <span className="text-sm text-orange-200 ml-2">{user.name}</span>
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

        {/* Mobile Dropdown */}
        {mobileMenu && user && (
          <div className="md:hidden border-t border-orange-500 bg-orange-600">
            <div className="px-4 py-2">
              <p className="text-sm text-orange-200 mb-2">👋 {user.name}</p>
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setMobileMenu(false)}
                  className={`block py-2.5 px-3 rounded-lg mb-1 transition ${
                    isActive(tab.path) ? 'bg-orange-700 text-white font-medium' : 'text-orange-100 hover:bg-orange-700/50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
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

      {/* Sidebar Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] bg-white shadow-2xl h-full overflow-y-auto animate-slide-in">
            <div className="bg-orange-600 text-white p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">🍜 HawkerGo</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 hover:bg-orange-700 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-orange-200 text-sm">
                {user?.role === 'owner' ? 'Hawker Owner' : 'Customer'}
              </p>
              <p className="text-white font-medium mt-1">{user?.name}</p>
            </div>

            <div className="p-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-2">
                App Overview
              </p>

              {/* Owner Section */}
              <p className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider px-3 mb-2 mt-4">
                🏪 Owner Panel
              </p>
              {allOwnerTabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-start gap-3 px-3 py-3 rounded-xl mb-1 transition ${
                    isActive(tab.path)
                      ? 'bg-orange-50 border border-orange-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <span className="text-2xl mt-0.5">{tab.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isActive(tab.path) ? 'text-orange-600' : 'text-gray-800'}`}>
                      {tab.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{tab.description}</p>
                  </div>
                  {isActive(tab.path) && (
                    <span className="text-orange-600 text-sm">●</span>
                  )}
                </Link>
              ))}

              {/* Customer Section */}
              <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider px-3 mb-2 mt-4">
                👤 Customer Panel
              </p>
              {allCustomerTabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-start gap-3 px-3 py-3 rounded-xl mb-1 transition ${
                    isActive(tab.path)
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <span className="text-2xl mt-0.5">{tab.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isActive(tab.path) ? 'text-blue-600' : 'text-gray-800'}`}>
                      {tab.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{tab.description}</p>
                  </div>
                  {isActive(tab.path) && (
                    <span className="text-blue-600 text-sm">●</span>
                  )}
                </Link>
              ))}

              <div className="border-t border-gray-100 mt-4 pt-4 px-3">
                <button
                  onClick={() => { handleLogout(); setDrawerOpen(false); }}
                  className="flex items-center gap-3 w-full py-2.5 rounded-xl hover:bg-red-50 transition text-red-600"
                >
                  <span className="text-xl">🚪</span>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex items-center justify-around h-14">
            {tabs.slice(0, 4).map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg transition ${
                  isActive(tab.path) ? 'text-orange-600' : 'text-gray-400'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[10px] font-medium truncate max-w-[60px] text-center">{tab.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-gray-400"
            >
              <span className="text-lg">🚪</span>
              <span className="text-[10px] font-medium">Logout</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
