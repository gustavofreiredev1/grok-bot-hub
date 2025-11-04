import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Copy,
  Trash2,
  Edit,
  Play,
  Calendar,
  MessageSquare,
  Zap,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFlowManagement } from "@/hooks/useFlowManagement";

const FlowsLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const {
    flows,
    loadFlows,
    deleteFlow,
    duplicateFlow,
  } = useFlowManagement();

  useEffect(() => {
    loadFlows();
  }, []);

  const filteredFlows = flows.filter((flow) =>
    flow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const templates = [
    {
      id: "welcome",
      name: "Fluxo de Boas-Vindas",
      description: "Mensagem automática para novos contatos",
      nodes: 3,
      color: "bg-blue-500",
    },
    {
      id: "support",
      name: "Atendimento Automatizado",
      description: "Fluxo com menu de opções e respostas",
      nodes: 8,
      color: "bg-purple-500",
    },
    {
      id: "survey",
      name: "Pesquisa de Satisfação",
      description: "Coleta feedback dos clientes",
      nodes: 5,
      color: "bg-green-500",
    },
    {
      id: "promotion",
      name: "Campanha Promocional",
      description: "Divulgação de ofertas e promoções",
      nodes: 4,
      color: "bg-orange-500",
    },
  ];

  const handleCreateFlow = (templateId?: string) => {
    if (templateId) {
      toast.success(`Criando fluxo a partir do template...`);
      navigate("/flow-editor");
    } else {
      navigate("/flow-editor");
    }
  };

  const handleEditFlow = (flowId: string) => {
    navigate(`/flow-editor?id=${flowId}`);
  };

  const handleDuplicate = (flowId: string) => {
    const dup = duplicateFlow(flowId);
    if (dup) {
      loadFlows();
      toast.success("Fluxo duplicado com sucesso!");
    }
  };

  const handleDelete = (flowId: string) => {
    deleteFlow(flowId);
    loadFlows();
    toast.success("Fluxo deletado!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fluxos</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie seus fluxos de automação
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
            <DialogTrigger asChild>
              <Button variant="outline" size="default">
                <Zap className="h-4 w-4 mr-2" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Escolha um Template</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => handleCreateFlow(template.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-12 w-12 rounded-lg ${template.color} flex items-center justify-center flex-shrink-0`}>
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {template.nodes} nós
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            className="bg-primary text-primary-foreground shadow-glow"
            onClick={() => handleCreateFlow()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Fluxo
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar fluxos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Fluxos</p>
              <p className="text-2xl font-bold text-foreground mt-1">{flows.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fluxos Ativos</p>
              <p className="text-2xl font-bold text-foreground mt-1">0</p>
            </div>
            <Play className="h-8 w-8 text-success" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Rascunho</p>
              <p className="text-2xl font-bold text-foreground mt-1">{flows.length}</p>
            </div>
            <Edit className="h-8 w-8 text-warning" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Templates</p>
              <p className="text-2xl font-bold text-foreground mt-1">{templates.length}</p>
            </div>
            <Zap className="h-8 w-8 text-info" />
          </div>
        </Card>
      </div>

      {/* Flows Grid */}
      {filteredFlows.length === 0 ? (
        <Card className="p-12 text-center bg-gradient-card border-border">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum fluxo encontrado
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "Tente buscar por outro termo"
              : "Comece criando seu primeiro fluxo de automação"}
          </p>
          {!searchQuery && (
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => handleCreateFlow()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Fluxo
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFlows.map((flow) => (
            <Card
              key={flow.id}
              className="p-5 bg-gradient-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => handleEditFlow(flow.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {flow.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Rascunho
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleEditFlow(flow.id);
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicate(flow.id);
                    }}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(flow.id);
                      }}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Atualizado: {new Date(flow.updatedAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {flow.nodes?.length || 0} nós
                  </span>
                  <span className="text-muted-foreground">
                    {flow.edges?.length || 0} conexões
                  </span>
                </div>
              </div>

              {/* Flow Preview Miniature */}
              <div className="mt-4 h-20 bg-background rounded-lg border border-border flex items-center justify-center">
                <div className="flex items-center gap-2">
                  {[...Array(Math.min(flow.nodes?.length || 0, 5))].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-full bg-primary/30"
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowsLibrary;
