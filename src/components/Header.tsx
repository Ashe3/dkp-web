import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Members
        </Link>
        <Link to="/events" className="hover:underline">
          Events
        </Link>
        {user?.role === "admin" && (
          <Link to="/users" className="hover:underline">
            Users
          </Link>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            Logged in as <strong>{user.username}</strong>
          </span>
          <button
            onClick={logout}
            className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
