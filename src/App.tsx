import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import OwnerDashboard from './pages/OwnerDashboard';
import OwnerOrders from './pages/OwnerOrders';
import OwnerMenu from './pages/OwnerMenu';
import OwnerStallInfo from './pages/OwnerStallInfo';
import CustomerHome from './pages/CustomerHome';
import CustomerHawkerDetail from './pages/CustomerHawkerDetail';
import CustomerPayment from './pages/CustomerPayment';
import CustomerProfile from './pages/CustomerProfile';

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: 'owner' | 'customer' }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  if (user.role !== role) return <Navigate to={user.role === 'owner' ? '/owner/dashboard' : '/customer'} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/signin" element={user ? <Navigate to={user.role === 'owner' ? '/owner/dashboard' : '/customer'} replace /> : <SignIn />} />
      <Route path="/signup" element={user ? <Navigate to={user.role === 'owner' ? '/owner/dashboard' : '/customer'} replace /> : <SignUp />} />

      <Route element={<Layout />}>
        <Route path="/owner/dashboard" element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/owner/orders" element={<ProtectedRoute role="owner"><OwnerOrders /></ProtectedRoute>} />
        <Route path="/owner/menu" element={<ProtectedRoute role="owner"><OwnerMenu /></ProtectedRoute>} />
        <Route path="/owner/stall" element={<ProtectedRoute role="owner"><OwnerStallInfo /></ProtectedRoute>} />
        <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerHome /></ProtectedRoute>} />
        <Route path="/customer/cart" element={<ProtectedRoute role="customer"><CustomerPayment /></ProtectedRoute>} />
        <Route path="/customer/profile" element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />
        <Route path="/customer/:id" element={<ProtectedRoute role="customer"><CustomerHawkerDetail /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
