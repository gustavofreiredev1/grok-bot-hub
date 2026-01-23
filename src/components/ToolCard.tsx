import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Tool {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  route: string;
  category: "automation" | "extraction" | "validation" | "messaging";
  isPro?: boolean;
  isNew?: boolean;
  stats?: {
    label: string;
    value: string | number;
  };
}

interface ToolCardProps {
  tool: Tool;
  isActive?: boolean;
}

const categoryColors = {
  automation: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  extraction: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  validation: "bg-green-500/10 text-green-500 border-green-500/20",
  messaging: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const categoryLabels = {
  automation: "Automação",
  extraction: "Extração",
  validation: "Validação",
  messaging: "Mensagens",
};

export const ToolCard = ({ tool, isActive = true }: ToolCardProps) => {
  const navigate = useNavigate();
  const Icon = tool.icon;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border p-6 transition-all duration-300 cursor-pointer",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30",
        "bg-gradient-to-br from-card to-card/80",
        !isActive && "opacity-60 cursor-not-allowed"
      )}
      onClick={() => isActive && navigate(tool.route)}
    >
      {/* Category Badge */}
      <div className="absolute top-4 right-4 flex gap-2">
        {tool.isNew && (
          <Badge variant="default" className="bg-green-500 text-white text-[10px] px-2">
            NOVO
          </Badge>
        )}
        {tool.isPro && (
          <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-2">
            PRO
          </Badge>
        )}
      </div>

      {/* Icon and Title */}
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
          "bg-primary/10 group-hover:bg-primary/20 group-hover:scale-105"
        )}>
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">
            {tool.shortName}
          </h3>
          <Badge variant="outline" className={cn("text-[10px] mt-1", categoryColors[tool.category])}>
            {categoryLabels[tool.category]}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
        {tool.description}
      </p>

      {/* Stats */}
      {tool.stats && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{tool.stats.label}</span>
            <span className="text-sm font-semibold text-primary">{tool.stats.value}</span>
          </div>
        </div>
      )}

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};
