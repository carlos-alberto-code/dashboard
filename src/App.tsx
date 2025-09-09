// App.tsx
import { useState } from "react";
import { Sidebar } from './components/layout/Sidebar';
import SaludAppWindow from './components/SaludAppWindow';

function App() {
  const [activeView, setActiveView] = useState("appHealth");

  const renderActiveView = () => {
    switch (activeView) {
      case "appHealth":
        return <SaludAppWindow />;
      case "users":
        return <div>Vista de Usuarios</div>;
      case "engagement":
        return <div>Vista de Engagement</div>;
      case "learning":
        return <div>Vista de Aprendizaje</div>;
      case "gamification":
        return <div>Vista de Gamificación</div>;
      default:
        return <SaludAppWindow />;
    }
  };

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-6 overflow-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;