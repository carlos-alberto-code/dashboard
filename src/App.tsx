import {Routes, Route, Navigate} from 'react-router-dom';
import {MainLayout} from './components/layout/MainLayout';
import SaludAppWindow from './components/SaludAppWindow';
import UsuariosWindow from './components/UsuariosWindow';
import {ProtectedRoute} from './components/ProtectedRoute';
import EngagementWindow from './components/EngagementWindow';
import LearningWindow from './components/LearningWindow';
import GamificationWindow from './components/GamificationWindow';
import LoginView from "./views/LoginView.tsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginView/>}/>
            <Route path="/" element={<Navigate to="/login" replace/>}/>

            <Route element={<ProtectedRoute/>}>
                <Route element={<MainLayout/>}>
                    <Route path="/salud" element={<SaludAppWindow/>}/>
                    <Route path="/users" element={<UsuariosWindow/>}/>
                    <Route path="/engagement" element={<EngagementWindow/>}/>
                    <Route path="/learning" element={<LearningWindow/>}/>
                    <Route path="/gamification" element={<GamificationWindow/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
