import { useState } from "react";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ScheduledMessage {
  id: string;
  title: string;
  message: string;
  groups: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: "pending" | "sent" | "failed";
  createdAt: string;
}

export default function Schedule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    message: "",
    date: "",
    time: "",
    groups: [] as string[],
  });

  const mockGroups = [
    { id: "1", name: "Grupo Vendas" },
    { id: "2", name: "Suporte Premium" },
    { id: "3", name: "Marketing Digital" },
  ];

  const [schedules, setSchedules] = useState<ScheduledMessage[]>([
    {
      id: "1",
      title: "Promoção Black Friday",
      message: "Aproveite 50% de desconto em todos os produtos!",
      groups: ["Grupo Vendas", "Marketing Digital"],
      scheduledDate: "2025-10-20",
      scheduledTime: "09:00",
      status: "pending",
      createdAt: "2025-10-15",
    },
    {
      id: "2",
      title: "Lembrete de Pagamento",
      message: "Olá! Lembrando que sua fatura vence amanhã.",
      groups: ["Suporte Premium"],
      scheduledDate: "2025-10-18",
      scheduledTime: "14:30",
      status: "pending",
      createdAt: "2025-10-14",
    },
    {
      id: "3",
      title: "Boas-vindas Novos Membros",
      message: "Seja bem-vindo ao nosso grupo!",
      groups: ["Grupo Vendas"],
      scheduledDate: "2025-10-14",
      scheduledTime: "10:00",
      status: "sent",
      createdAt: "2025-10-10",
    },
  ]);

  const handleDelete = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    toast.success("Agendamento removido");
  };

  const handleCreateSchedule = () => {
    if (!newSchedule.title.trim() || !newSchedule.message.trim() || !newSchedule.date || !newSchedule.time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    if (newSchedule.groups.length === 0) {
      toast.error("Selecione ao menos um grupo");
      return;
    }

    const schedule: ScheduledMessage = {
      id: Date.now().toString(),
      title: newSchedule.title,
      message: newSchedule.message,
      groups: newSchedule.groups,
      scheduledDate: newSchedule.date,
      scheduledTime: newSchedule.time,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setSchedules((prev) => [schedule, ...prev]);
    toast.success("Agendamento criado com sucesso!");
    setNewSchedule({ title: "", message: "", date: "", time: "", groups: [] });
    setIsDialogOpen(false);
  };

  const toggleGroup = (groupId: string) => {
    setNewSchedule((prev) => ({
      ...prev,
      groups: prev.groups.includes(groupId)
        ? prev.groups.filter((id) => id !== groupId)
        : [...prev.groups, groupId],
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "sent":
        return <CheckCircle className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="gap-1">{getStatusIcon(status)} Pendente</Badge>;
      case "sent":
        return <Badge className="gap-1 bg-primary/10 text-primary border-primary/20">{getStatusIcon(status)} Enviado</Badge>;
      case "failed":
        return <Badge variant="destructive" className="gap-1">{getStatusIcon(status)} Falhou</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingCount = schedules.filter((s) => s.status === "pending").length;
  const sentCount = schedules.filter((s) => s.status === "sent").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Agendamentos</h1>
        <p className="text-muted-foreground">Gerencie todas as suas mensagens agendadas</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">{schedules.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-secondary/50">
              <Clock className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enviados</p>
              <p className="text-2xl font-bold text-foreground">{sentCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-destructive/10">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Falhados</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Schedules List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Mensagens Agendadas</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Agendamento</DialogTitle>
                    <DialogDescription>
                      Configure uma mensagem para ser enviada automaticamente
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="sched-title">Título do Agendamento</Label>
                      <Input
                        id="sched-title"
                        placeholder="Ex: Promoção Black Friday"
                        value={newSchedule.title}
                        onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sched-date">Data</Label>
                        <Input
                          id="sched-date"
                          type="date"
                          value={newSchedule.date}
                          onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sched-time">Horário</Label>
                        <Input
                          id="sched-time"
                          type="time"
                          value={newSchedule.time}
                          onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Selecionar Grupos</Label>
                      <Card className="p-4 max-h-32 overflow-y-auto bg-secondary/20">
                        <div className="space-y-2">
                          {mockGroups.map((group) => (
                            <div key={group.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`sched-${group.id}`}
                                checked={newSchedule.groups.includes(group.id)}
                                onCheckedChange={() => toggleGroup(group.id)}
                              />
                              <label
                                htmlFor={`sched-${group.id}`}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {group.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sched-message">Mensagem</Label>
                      <Textarea
                        id="sched-message"
                        placeholder="Digite a mensagem que será enviada..."
                        value={newSchedule.message}
                        onChange={(e) => setNewSchedule({ ...newSchedule, message: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateSchedule}>
                      Agendar Mensagem
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {schedules.map((schedule) => (
                <Card
                  key={schedule.id}
                  className="p-4 bg-gradient-subtle border-border hover:shadow-glow transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{schedule.title}</h3>
                        {getStatusBadge(schedule.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{schedule.message}</p>
                      <div className="flex flex-wrap gap-2">
                        {schedule.groups.map((group, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(schedule.scheduledDate).toLocaleDateString("pt-BR")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.scheduledTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {schedule.status === "pending" && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Agendamento</DialogTitle>
                                <DialogDescription>
                                  Funcionalidade em desenvolvimento
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Guide & Calendar */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-primary border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">📖 Como Agendar</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">1. Criar Agendamento</p>
                <p>Clique em "Novo Agendamento" no topo</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">2. Configure</p>
                <p>Defina data, hora, grupos e mensagem</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">3. Monitore</p>
                <p>Acompanhe o status em tempo real</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">4. Edite se Necessário</p>
                <p>Modifique antes do horário agendado</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">⚡ Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Agendamento preciso por data/hora</li>
              <li>• Envio para múltiplos grupos</li>
              <li>• Edição de mensagens pendentes</li>
              <li>• Histórico completo de envios</li>
              <li>• Notificações de status</li>
              <li>• Reagendamento automático em falhas</li>
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">💡 Dicas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Agende com antecedência para campanhas</li>
              <li>• Use horários de maior engajamento</li>
              <li>• Revise mensagens antes de agendar</li>
              <li>• Evite horários de descanso</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
