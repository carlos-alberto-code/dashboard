import { useState } from "react";
import { Title, Text, NavLink } from "@mantine/core";
import { Activity, Users, BarChart3, BookOpen, Trophy } from "lucide-react";

const navigationItems = [
  { icon: Activity, label: "Salud de la App" },
  { icon: Users, label: "Usuarios" },
  { icon: BarChart3, label: "Engagement" },
  { icon: BookOpen, label: "Aprendizaje" },
  { icon: Trophy, label: "Gamificación" },
];

export function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="flex flex-col p-4 h-screen bg-white shadow-md min-w-[220px]">
      <div className="mb-8 flex flex-col">
        <Title
          order={2}
          size="2xl"
          className="text-uvm-negro mb-2 font-bold tracking-tight"
        >
          Dashboard Ruta Lince
        </Title>
        <Text size="lg" className="text-uvm-gris font-medium">
          Panel de Supervisión
        </Text>
      </div>

      <hr className="border-t border-gray-300 my-1" />

    <nav className="flex flex-col gap-2 mt-6 w-full">
      {navigationItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = idx === activeIndex;
        return (
        <NavLink
          key={item.label}
          label={item.label}
          leftSection={<Icon size={18} />}
          active={isActive}
          className={`w-full flex items-center gap-x-3 justify-start rounded-lg font-medium text-sm px-4 py-2 transition-colors ${
            isActive
            ? "bg-uvm-rojo text-white"
            : "bg-transparent text-uvm-gris hover:bg-gray-100"
          }`}
          variant={isActive ? "filled" : "subtle"}
          onClick={() => setActiveIndex(idx)}
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