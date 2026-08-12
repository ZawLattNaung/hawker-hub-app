import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <span>🍜</span>
              <span>HawkerHub</span>
            </Link>

            {user && (
              <div className="flex items-center gap-4">
                {user.role === 'owner' ? (
                  <>
                    <Link to="/owner/dashboard" className="hover:text-orange-200 transition">Dashboard</Link>
                    <Link to="/owner/menu" className="hover:text-orange-200 transition">Menu</Link>
                    <Link to="/owner/stall" className="hover:text-orange-200 transition">My Stall</Link>
                  </>
                ) : (
                  <Link to="/customer" className="hover:text-orange-200 transition">Explore Centres</Link>
                )}
                <span className="text-sm text-orange-200">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-700 hover:bg-orange-800 px-3 py-1 rounded text-sm transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
