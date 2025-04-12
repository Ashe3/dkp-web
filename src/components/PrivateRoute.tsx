import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from './Header';

export const PrivateRoute = ({
  adminOnly = false,
}: {
  adminOnly?: boolean;
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (adminOnly && user?.role !== 'admin') return <Navigate to="/" />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
