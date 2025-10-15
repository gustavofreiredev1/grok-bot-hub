import { useState } from "react";
import { Send, Clock, Users, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Messages() {
  const [message, setMessage] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const mockGroups = [
    { id: "1", name: "Grupo Vendas", members: 245 },
    { id: "2", name: "Suporte Premium", members: 89 },
    { id: "3", name: "Marketing Digital", members: 156 },
    { id: "4", name: "Desenvolvimento", members: 34 },
  ];

  const handleSend = () => {
    if (!message || selectedGroups.length === 0) {
      toast.error("Selecione grupos e escreva uma mensagem");
      return;
    }
    toast.success("Mensagem enviada com sucesso!");
    setMessage("");
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
              <Label htmlFor="message-type">Tipo de Envio</Label>
              <Select defaultValue="instant">
                <SelectTrigger id="message-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Envio Instantâneo</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="groups">Selecionar Grupos</Label>
              <Select>
                <SelectTrigger id="groups">
                  <SelectValue placeholder="Escolha os grupos destinatários" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name} ({group.members} membros)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGroups.length > 0 && selectedGroups.map((id) => {
                  const group = mockGroups.find(g => g.id === id);
                  return (
                    <Badge key={id} variant="secondary">
                      {group?.name}
                    </Badge>
                  );
                })}
              </div>
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
              <Button variant="outline" className="w-full justify-start" size="sm">
                Boas-vindas
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Promoção
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Lembrete
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Criar Template
              </Button>
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
