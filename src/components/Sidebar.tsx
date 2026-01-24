import { NavLink, useLocation } from "react-router-dom";
import { 
  Bot, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Zap, 
  Workflow,
  Send, 
  Upload, 
  Calendar, 
  FileText, 
  BookOpen,
  CreditCard,
  LogOut,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ferramentas", href: "/bots", icon: Zap },
  { name: "Fluxos", href: "/flows", icon: Workflow },
  { name: "Mensagens", href: "/messages", icon: Send },
  { name: "Agendamentos", href: "/schedule", icon: Calendar },
  { name: "Relatórios", href: "/reports", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Análise Fluxos", href: "/flow-analysis", icon: BarChart3 },
];

const secondaryNavigation = [
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Faturas", href: "/invoices", icon: CreditCard },
  { name: "Manual", href: "/guide", icon: BookOpen },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const { user, profile, subscription, signOut } = useAuth();
  const location = useLocation();

  const isPro = subscription?.status === "active" && 
    subscription?.plan?.name && 
    subscription.plan.name !== "Starter";

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "US";
  };

  const getUserName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split("@")[0];
    return "Usuário";
  };

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">Grok Bot</span>
          <span className="text-[10px] text-muted-foreground -mt-1">Hub</span>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Menu Principal
        </p>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === "/bots" && location.pathname.startsWith("/tools"));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              {item.name}
            </NavLink>
          );
        })}

        <div className="pt-4">
          <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Outros
          </p>
          {secondaryNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4">
        {/* Plan Badge */}
        <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">
                {subscription?.plan?.name || "Starter"}
              </span>
            </div>
            {isPro ? (
              <Badge className="bg-primary text-primary-foreground text-[10px]">PRO</Badge>
            ) : (
              <NavLink to="/pricing">
                <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-primary/10">
                  Upgrade
                </Badge>
              </NavLink>
            )}
          </div>
        </div>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-2 h-auto py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                <span className="text-sm font-semibold text-primary">{getUserInitials()}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground truncate">{getUserName()}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <NavLink to="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink to="/pricing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Planos
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
