import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Clock, MessageSquare, Play, Pause, Settings, Workflow } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const automations = [
  {
    name: "Boas-vindas Automáticas",
    description: "Mensagem de boas-vindas para novos membros",
    status: "active",
    triggers: 124,
    lastRun: "Há 5 minutos",
  },
  {
    name: "Respostas FAQ",
    description: "Respostas automáticas para perguntas frequentes",
    status: "active",
    triggers: 456,
    lastRun: "Há 2 minutos",
  },
  {
    name: "Moderação de Conteúdo",
    description: "Filtro automático de palavras proibidas",
    status: "paused",
    triggers: 23,
    lastRun: "Há 1 hora",
  },
  {
    name: "Envio Programado",
    description: "Mensagens agendadas para grupos específicos",
    status: "active",
    triggers: 89,
    lastRun: "Há 15 minutos",
  },
];

const Automation = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [automationName, setAutomationName] = useState("");
  const [automationDescription, setAutomationDescription] = useState("");

  const handleCreateAutomation = () => {
    if (!automationName.trim()) {
      toast.error("Digite um nome para a automação");
      return;
    }
    toast.success(`Automação "${automationName}" criada com sucesso!`);
    setAutomationName("");
    setAutomationDescription("");
    setIsDialogOpen(false);
  };

  const toggleAutomation = (name: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "pausado" : "ativado";
    toast.success(`Automação "${name}" ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Automação</h1>
          <p className="mt-1 text-muted-foreground">
            Configure e gerencie suas automações
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
              <Zap className="mr-2 h-4 w-4" />
              Nova Automação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Automação</DialogTitle>
              <DialogDescription>
                Configure uma nova regra de automação
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="auto-name">Nome da Automação</Label>
                <Input
                  id="auto-name"
                  placeholder="Ex: Boas-vindas Automáticas"
                  value={automationName}
                  onChange={(e) => setAutomationName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auto-desc">Descrição</Label>
                <Textarea
                  id="auto-desc"
                  placeholder="Descreva o que esta automação fará..."
                  value={automationDescription}
                  onChange={(e) => setAutomationDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAutomation}>
                Criar Automação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {automations.map((automation) => (
          <Card key={automation.name} className="bg-gradient-card border-border p-6 shadow-md transition-all hover:shadow-lg hover:shadow-glow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{automation.name}</h3>
                    <Badge 
                      variant={automation.status === "active" ? "default" : "secondary"}
                      className={automation.status === "active" ? "bg-green-500/10 text-green-500" : ""}
                    >
                      {automation.status === "active" ? "Ativo" : "Pausado"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{automation.description}</p>
                  
                  <div className="mt-4 flex gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{automation.triggers} triggers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{automation.lastRun}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border"
                  onClick={() => toggleAutomation(automation.name, automation.status)}
                >
                  {automation.status === "active" ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="icon" className="border-border">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-primary border-border p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
            <Workflow className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Editor Visual de Fluxos</h3>
            <p className="text-sm text-muted-foreground">
              Crie fluxos de automação complexos de forma visual, arrastando e conectando nós
            </p>
          </div>
          <Button 
            variant="secondary"
            onClick={() => navigate("/flow-editor")}
          >
            Abrir Editor
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Automation;
