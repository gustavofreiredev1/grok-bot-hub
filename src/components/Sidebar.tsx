import { NavLink } from "react-router-dom";
import { Bot, LayoutDashboard, BarChart3, Settings, Zap, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

import { Send, Upload, Calendar, FileText, BookOpen } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bots", href: "/bots", icon: Bot },
  { name: "Mensagens", href: "/messages", icon: Send },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Agendamentos", href: "/schedule", icon: Calendar },
  { name: "Relatórios", href: "/reports", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Automação", href: "/automation", icon: Zap },
  { name: "Editor de Fluxos", href: "/flow-editor", icon: Workflow },
  { name: "Manual", href: "/guide", icon: BookOpen },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">BotFlow</span>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary shadow-glow"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-gradient-primary p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <span className="text-sm font-semibold text-primary">AD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">admin@botflow.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
