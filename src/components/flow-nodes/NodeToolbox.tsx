import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Mic, 
  Image, 
  Video, 
  Clock, 
  GitBranch, 
  Zap, 
  Webhook, 
  PlayCircle, 
  StopCircle,
  MousePointerClick,
  List,
  MessageSquareDashed,
  Brain
} from "lucide-react";

const basicNodes = [
  { type: "message", label: "Mensagem", icon: MessageSquare, color: "text-blue-500", description: "Envia mensagem de texto" },
  { type: "button", label: "Botões", icon: MousePointerClick, color: "text-green-500", description: "Envia botões interativos" },
  { type: "list", label: "Lista", icon: List, color: "text-amber-500", description: "Envia lista de opções" },
  { type: "input", label: "Entrada", icon: MessageSquareDashed, color: "text-teal-500", description: "Captura resposta do usuário" },
];

const mediaNodes = [
  { type: "audio", label: "Áudio", icon: Mic, color: "text-purple-500", description: "Envia arquivo de áudio" },
  { type: "image", label: "Imagem", icon: Image, color: "text-pink-500", description: "Envia imagem" },
  { type: "video", label: "Vídeo", icon: Video, color: "text-orange-500", description: "Envia vídeo" },
];

const logicNodes = [
  { type: "condition", label: "Condição", icon: GitBranch, color: "text-yellow-500", description: "Ramifica o fluxo" },
  { type: "delay", label: "Delay", icon: Clock, color: "text-cyan-500", description: "Aguarda tempo" },
  { type: "ai", label: "IA", icon: Brain, color: "text-fuchsia-500", description: "Resposta com IA" },
];

const integrationNodes = [
  { type: "action", label: "Ação", icon: Zap, color: "text-violet-500", description: "Executa ação" },
  { type: "webhook", label: "Webhook", icon: Webhook, color: "text-indigo-500", description: "Chama API externa" },
];

const controlNodes = [
  { type: "start", label: "Início", icon: PlayCircle, color: "text-emerald-500", description: "Inicia o fluxo" },
  { type: "end", label: "Fim", icon: StopCircle, color: "text-red-500", description: "Finaliza o fluxo" },
];


const NodeToolbox = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const renderNodeCategory = (title: string, nodes: typeof basicNodes) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h4>
      <div className="space-y-2">
        {nodes.map((node) => (
          <Card
            key={node.type}
            className="p-3 cursor-move hover:bg-accent/50 transition-colors border-border"
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
          >
            <div className="flex items-start gap-3">
              <node.icon className={`h-5 w-5 ${node.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground">{node.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{node.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-72 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Ferramentas
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {renderNodeCategory("Controle", controlNodes)}
          <Separator className="my-4" />
          {renderNodeCategory("Mensagens", basicNodes)}
          <Separator className="my-4" />
          {renderNodeCategory("Mídia", mediaNodes)}
          <Separator className="my-4" />
          {renderNodeCategory("Lógica", logicNodes)}
          <Separator className="my-4" />
          {renderNodeCategory("Integrações", integrationNodes)}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NodeToolbox;
