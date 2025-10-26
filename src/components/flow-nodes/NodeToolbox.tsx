import { Card } from "@/components/ui/card";
import { 
  PlayCircle, 
  MessageSquare, 
  GitBranch, 
  Zap, 
  StopCircle,
  Mic,
  Image,
  Video,
  Clock,
  Webhook
} from "lucide-react";

const nodeItems = [
  {
    type: "start",
    label: "Início",
    icon: PlayCircle,
    description: "Trigger inicial do fluxo",
    color: "text-green-500",
  },
  {
    type: "message",
    label: "Mensagem",
    icon: MessageSquare,
    description: "Enviar mensagem de texto",
    color: "text-blue-500",
  },
  {
    type: "audio",
    label: "Áudio",
    icon: Mic,
    description: "Enviar áudio no WhatsApp",
    color: "text-purple-500",
  },
  {
    type: "image",
    label: "Imagem",
    icon: Image,
    description: "Enviar imagem no WhatsApp",
    color: "text-pink-500",
  },
  {
    type: "video",
    label: "Vídeo",
    icon: Video,
    description: "Enviar vídeo no WhatsApp",
    color: "text-orange-500",
  },
  {
    type: "delay",
    label: "Delay",
    icon: Clock,
    description: "Aguardar tempo específico",
    color: "text-cyan-500",
  },
  {
    type: "condition",
    label: "Condição",
    icon: GitBranch,
    description: "Ramificação lógica",
    color: "text-yellow-500",
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: Webhook,
    description: "Chamar API externa",
    color: "text-indigo-500",
  },
  {
    type: "action",
    label: "Ação",
    icon: Zap,
    description: "Salvar dados ou executar ação",
    color: "text-violet-500",
  },
  {
    type: "end",
    label: "Fim",
    icon: StopCircle,
    description: "Encerrar fluxo",
    color: "text-red-500",
  },
];

const NodeToolbox = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Caixa de Ferramentas
      </h3>
      <div className="space-y-3">
        {nodeItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.type}
              draggable
              onDragStart={(e) => onDragStart(e, item.type)}
              className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all bg-gradient-card border-border"
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 ${item.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Como usar:</strong> Arraste os nós para o canvas e conecte-os clicando nas portas de conexão.
        </p>
      </div>
    </div>
  );
};

export default NodeToolbox;
