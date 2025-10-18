import { useState } from "react";
import { Send, Clock, Users, FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Messages() {
  const [message, setMessage] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [sendType, setSendType] = useState<"instant" | "scheduled">("instant");

  const mockGroups = [
    { id: "1", name: "Grupo Vendas", members: 245 },
    { id: "2", name: "Suporte Premium", members: 89 },
    { id: "3", name: "Marketing Digital", members: 156 },
    { id: "4", name: "Desenvolvimento", members: 34 },
  ];

  const templates = [
    { id: "1", name: "Boas-vindas", content: "Olá! Seja bem-vindo ao nosso grupo! 👋" },
    { id: "2", name: "Promoção", content: "🎉 Aproveite nossa promoção especial! Até 50% de desconto!" },
    { id: "3", name: "Lembrete", content: "📅 Lembrando você sobre nosso evento amanhã às 10h!" },
  ];

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("Escreva uma mensagem");
      return;
    }
    if (selectedGroups.length === 0) {
      toast.error("Selecione ao menos um grupo");
      return;
    }
    
    toast.success(`Mensagem ${sendType === "instant" ? "enviada" : "agendada"} com sucesso!`);
    setMessage("");
    setSelectedGroups([]);
  };

  const applyTemplate = (content: string) => {
    setMessage(content);
    toast.success("Template aplicado");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Enviar Mensagens</h1>
        <p className="text-muted-foreground">Envie mensagens instantâneas ou agendadas para seus grupos</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mensagens Hoje</p>
              <p className="text-2xl font-bold text-foreground">1,234</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Agendadas</p>
              <p className="text-2xl font-bold text-foreground">45</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Entrega</p>
              <p className="text-2xl font-bold text-foreground">98.5%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Form */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose Message */}
        <Card className="lg:col-span-2 p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Compor Mensagem</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Tipo de Envio</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={sendType === "instant" ? "default" : "outline"}
                  onClick={() => setSendType("instant")}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Instantâneo
                </Button>
                <Button
                  type="button"
                  variant={sendType === "scheduled" ? "default" : "outline"}
                  onClick={() => setSendType("scheduled")}
                  className="flex-1"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Agendado
                </Button>
              </div>
            </div>

            <div>
              <Label>Selecionar Grupos</Label>
              <Card className="p-4 mt-2 max-h-48 overflow-y-auto bg-secondary/20">
                <div className="space-y-3">
                  {mockGroups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={group.id}
                        checked={selectedGroups.includes(group.id)}
                        onCheckedChange={() => toggleGroup(group.id)}
                      />
                      <label
                        htmlFor={group.id}
                        className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {group.name}
                        <span className="text-muted-foreground ml-2">({group.members} membros)</span>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
              {selectedGroups.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedGroups.map((id) => {
                    const group = mockGroups.find(g => g.id === id);
                    return (
                      <Badge key={id} variant="secondary" className="gap-1">
                        {group?.name}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => toggleGroup(id)}
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Digite sua mensagem aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {message.length} / 4096 caracteres
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSend} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Enviar Agora
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </div>
          </div>
        </Card>

        {/* Templates & Guide */}
        <div className="space-y-4">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Templates Rápidos
            </h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => applyTemplate(template.content)}
                >
                  {template.name}
                </Button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Template
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Novo Template</DialogTitle>
                    <DialogDescription>
                      Funcionalidade em desenvolvimento
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-primary border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">📖 Guia Rápido</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Selecione um ou mais grupos</li>
              <li>• Digite sua mensagem</li>
              <li>• Escolha envio instantâneo ou agendado</li>
              <li>• Use templates para agilizar</li>
              <li>• Monitore o status em tempo real</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
