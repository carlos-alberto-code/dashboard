import {NavLink} from "react-router-dom";
import {logout} from "../../api/login.ts";
import {Heart, UsersRound, MessageSquare, BookOpen, Gamepad2, X, LogOut} from "lucide-react";

const navigationItems = [
    {icon: Heart, label: "Salud de la App", path: "/salud"},
    {icon: UsersRound, label: "Usuarios", path: "/users"},
    {icon: MessageSquare, label: "Engagement", path: "/engagement"},
    {icon: BookOpen, label: "Aprendizaje", path: "/learning"},
    {icon: Gamepad2, label: "Gamificación", path: "/gamification"},
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({isOpen, onClose}: SidebarProps) {
    const baseLinkClasses =
        "w-full flex items-center gap-x-3 justify-start rounded-lg font-medium text-sm px-4 py-2 transition-colors";

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 bg-black text-white min-w-[220px]
                 transform transition-transform duration-300 ease-in-out
                 h-screen md:sticky md:top-0 md:translate-x-0
                 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="h-full flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-x-3">
                            <span className="text-3xl font-bold text-white tracking-tighter">UVM</span>
                            <div className="h-12 w-px bg-gray-600"/>
                            <div className="flex flex-col">
                                <span className="text-2xl font-semibold text-white leading-tight">Dashboard</span>
                                <span className="text-2xl font-semibold text-white leading-tight">Ruta Lince</span>
                            </div>
                        </div>
                        <p className="mt-1 text-base text-gray-400">Panel de Superusuario</p>
                    </div>
                    <button onClick={onClose} className="md:hidden text-gray-300 hover:text-white">
                        <X size={24}/>
                    </button>
                </div>

                <hr className="border-t border-white/20 my-1"/>

                <nav className="flex flex-col gap-2 mt-6 w-full">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                end={item.path === "/"}
                                className={({isActive}) =>
                                    `${baseLinkClasses} ${
                                        isActive ? "bg-red-700 text-white py-3" : "bg-transparent text-gray-300 hover:bg-white/10"
                                    }`
                                }
                            >
                                <Icon size={18}/>
                                <span className="text-lg">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="mt-auto">
                    <hr className="border-t border-white/20 my-4"/>
                    <button onClick={logout}
                            className={`${baseLinkClasses} text-gray-300 hover:bg-red-700 hover:text-white`}>
                        <LogOut size={18}/>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
