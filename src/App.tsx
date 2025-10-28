import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import SaludAppWindow from './components/SaludAppWindow';
import UsuariosWindow from './components/UsuariosWindow';
import LoginPage from "./components/LoginPage";
import { ProtectedRoute } from './components/ProtectedRoute';
import EngagementWindow from './components/EngagementWindow';
import LearningWindow from './components/LearningWindow';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SaludAppWindow />} />
          <Route path="users" element={<UsuariosWindow />} />
          <Route path="engagement" element={<EngagementWindow />} />
          <Route path="learning" element={<LearningWindow />} />
          <Route path="gamification" element={<div>Vista de gamification</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;