import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen md:flex">
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1">
        <div className="p-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
        </div>

        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};