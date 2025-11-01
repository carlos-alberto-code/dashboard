import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import SaludAppWindow from './components/SaludAppWindow';
import UsuariosWindow from './components/UsuariosWindow';
import { ProtectedRoute } from './components/ProtectedRoute';
import EngagementWindow from './components/EngagementWindow';
import LearningWindow from './components/LearningWindow';
import GamificationWindow from './components/GamificationWindow';
import Login from "./views/Login.tsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SaludAppWindow />} />
          <Route path="users" element={<UsuariosWindow />} />
          <Route path="engagement" element={<EngagementWindow />} />
          <Route path="learning" element={<LearningWindow />} />
          <Route path="gamification" element={<GamificationWindow />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;