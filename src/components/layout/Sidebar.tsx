// components/layout/Sidebar.tsx
import { Title, Text, NavLink } from "@mantine/core";
import { Activity, Users, BarChart3, BookOpen, Trophy } from "lucide-react";

const navigationItems = [
  { icon: Activity, label: "Salud de la App", key: "appHealth" },
  { icon: Users, label: "Usuarios", key: "users" },
  { icon: BarChart3, label: "Engagement", key: "engagement" },
  { icon: BookOpen, label: "Aprendizaje", key: "learning" },
  { icon: Trophy, label: "Gamificación", key: "gamification" },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="flex flex-col p-4 min-h-screen bg-black text-white min-w-[220px]">
      <div className="mb-8 flex flex-col">
        <Title
          order={2}
          size="2xl"
          className="text-white mb-2 font-bold tracking-tight"
        >
          Dashboard Ruta Lince
        </Title>
        <Text size="lg" className="text-gray-300 font-medium">
          Panel de Supervisión
        </Text>
      </div>

      <hr className="border-t border-white/20 my-1" />

      <nav className="flex flex-col gap-2 mt-6 w-full">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeView;
          return (
            <NavLink
              key={item.key}
              label={item.label}
              leftSection={<Icon size={18} />}
              active={isActive}
              className={`w-full flex items-center gap-x-3 justify-start rounded-lg font-medium text-sm px-4 py-2 transition-colors ${
                isActive
                  ? "bg-uvm-rojo text-white"
                  : "bg-transparent text-gray-300 hover:bg-white/10"
              }`}
              variant="subtle"
              onClick={() => onViewChange(item.key)}
              style={{
                cursor: "pointer",
                boxShadow: isActive
                  ? "0 2px 8px rgba(0,0,0,0.08)"
                  : undefined,
              }}
            />
          );
        })}
      </nav>
    </aside>
  );
}