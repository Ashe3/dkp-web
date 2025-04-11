import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Players from './pages/Players';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="/members" element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
}
