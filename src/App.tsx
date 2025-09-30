import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import SaludAppWindow from './components/SaludAppWindow';
import LoginPage from "./components/LoginPage";
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SaludAppWindow />} />
          <Route path="users" element={<div>Vista de Usuarios</div>} />
          <Route path="engagement" element={<div>Vista de Engagement</div>} />
          <Route path="learning" element={<div>Vista de Aprendizaje</div>} />
          <Route path="gamification" element={<div>Vista de gamification</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;