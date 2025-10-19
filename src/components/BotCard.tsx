import { Bot, Users, MessageSquare, MoreVertical } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface BotCardProps {
  name: string;
  status: "active" | "inactive" | "error";
  groups: number;
  contacts: number;
  messages: number;
}

const statusConfig = {
  active: { label: "Ativo", color: "bg-green-500" },
  inactive: { label: "Inativo", color: "bg-gray-500" },
  error: { label: "Erro", color: "bg-red-500" },
};

export const BotCard = ({ name, status, groups, contacts, messages }: BotCardProps) => {
  const navigate = useNavigate();
  
  const getToolRoute = (toolName: string) => {
    const routes: Record<string, string> = {
      "Atendente IA ChatGPT": "/tools/ai-attendant",
      "WhatsFilter": "/tools/whatsfilter",
      "Exporter Group": "/tools/exporter-group",
      "SDExporter": "/tools/sdexporter",
      "Exporter Chat": "/tools/exporter-chat",
      "SDExporter UI": "/tools/sdexporter-ui",
      "WhatsAppOS": "/tools/whatsappos",
    };
    return routes[toolName] || "/bots";
  };
  const statusInfo = statusConfig[status];

  return (
    <Card 
      className="bg-gradient-card border-border p-6 shadow-md transition-all hover:shadow-lg hover:shadow-glow cursor-pointer"
      onClick={() => navigate(getToolRoute(name))}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${statusInfo.color}`}></span>
              <span className="text-sm text-muted-foreground">{statusInfo.label}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs">Grupos</span>
          </div>
          <span className="mt-1 text-lg font-semibold text-foreground">{groups}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs">Contatos</span>
          </div>
          <span className="mt-1 text-lg font-semibold text-foreground">{contacts}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">Mensagens</span>
          </div>
          <span className="mt-1 text-lg font-semibold text-foreground">{messages}</span>
        </div>
      </div>
    </Card>
  );
};
