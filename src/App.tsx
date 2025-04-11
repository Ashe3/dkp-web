import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Players from './pages/Players';
import Events from './pages/Events';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="/members" element={<Players />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}
