import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex gap-4">
      <Link to="/" className="hover:underline">
        Members
      </Link>
      <Link to="/events" className="hover:underline">
        Events
      </Link>
    </nav>
  );
}
