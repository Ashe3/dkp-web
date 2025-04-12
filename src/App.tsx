import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Players from './pages/Players';
import Events from './pages/Events';

import Users from './pages/Users';
import { AuthProvider } from './Context/AuthProvider';
import LoginPage from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Players />} />
            <Route path="/events" element={<Events />} />
          </Route>

          <Route element={<PrivateRoute adminOnly />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
