import { useState } from "react";
import { Bell, Search, LogOut, Settings, User, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, profile, signOut, loading, isPro } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
    navigate("/");
  };

  const getInitials = (name: string | null | undefined, email: string | undefined) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar bots, grupos, contatos..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"></span>
        </Button>

        {/* User Menu */}
        {loading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="hidden md:block">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-32" />
            </div>
          </div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 h-auto py-2 px-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {getInitials(profile?.full_name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {profile?.full_name || "Usuário"}
                    </span>
                    {isPro && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-1.5 py-0">
                        <Crown className="h-2.5 w-2.5 mr-0.5" />
                        PRO
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{profile?.full_name || "Usuário"}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <User className="mr-2 h-4 w-4" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              {!isPro && (
                <DropdownMenuItem onClick={() => navigate("/pricing")}>
                  <Crown className="mr-2 h-4 w-4 text-amber-500" />
                  <span className="text-amber-500 font-medium">Fazer Upgrade</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {signingOut ? "Saindo..." : "Sair"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate("/auth")} size="sm">
            Entrar
          </Button>
        )}
      </div>
    </header>
  );
};
