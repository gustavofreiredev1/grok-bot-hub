import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PhoneCall, Download, Play, Pause } from "lucide-react";
import { toast } from "sonner";

const SDExporter = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [contacts, setContacts] = useState<{ number: string; timestamp: string; type: "call" | "message" }[]>([]);

  const handleToggleMonitoring = () => {
    if (!isMonitoring) {
      setIsMonitoring(true);
      toast.success("Monitoramento iniciado!");
      
      // Simulação de captura de contatos
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const newContact = {
            number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
            timestamp: new Date().toLocaleString("pt-BR"),
            type: Math.random() > 0.5 ? "call" as const : "message" as const
          };
          setContacts(prev => [newContact, ...prev]);
        }
      }, 3000);

      // Limpar após 30 segundos (apenas para demo)
      setTimeout(() => {
        clearInterval(interval);
      }, 30000);
    } else {
      setIsMonitoring(false);
      toast.info("Monitoramento pausado");
    }
  };

  const handleExport = () => {
    if (contacts.length === 0) {
      toast.error("Nenhum contato capturado");
      return;
    }

    const csv = "Número,Data/Hora,Tipo\n" + contacts.map(c => `${c.number},${c.timestamp},${c.type === "call" ? "Chamada" : "Mensagem"}`).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contatos-desconhecidos-${Date.now()}.csv`;
    a.click();
    
    toast.success("Contatos exportados!");
  };

  const handleClear = () => {
    setContacts([]);
    toast.success("Lista limpa!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <PhoneCall className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">SDExporter</h1>
          <p className="text-muted-foreground">
            Capture automaticamente números desconhecidos de conversas e chamadas
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Controle de Monitoramento</h2>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <p className="font-medium">Status do Monitoramento</p>
              <p className="text-xs text-muted-foreground">
                {isMonitoring ? "Capturando contatos em tempo real" : "Monitoramento pausado"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="monitor-switch" className="text-sm">
                {isMonitoring ? "Ativo" : "Inativo"}
              </Label>
              <Switch
                id="monitor-switch"
                checked={isMonitoring}
                onCheckedChange={handleToggleMonitoring}
              />
            </div>
          </div>

          <Button
            onClick={handleToggleMonitoring}
            className="w-full"
            variant={isMonitoring ? "destructive" : "default"}
          >
            {isMonitoring ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pausar Monitoramento
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Iniciar Monitoramento
              </>
            )}
          </Button>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
            <h3 className="font-semibold text-sm">📱 Funcionalidades:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Captura números de chamadas recebidas/feitas</li>
              <li>Detecta mensagens de contatos não salvos</li>
              <li>Exportação automática para planilhas</li>
              <li>Inclui código do país automaticamente</li>
              <li>Monitoramento contínuo em background</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 space-y-2">
            <h3 className="font-semibold text-sm">⚠️ Importante:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
              <li>Mantenha o WhatsApp aberto</li>
              <li>Internet estável necessária</li>
              <li>Não captura nomes, apenas números</li>
              <li>Use de forma responsável e ética</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contatos Capturados</h2>
            {contacts.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  Limpar
                </Button>
              </div>
            )}
          </div>

          {contacts.length > 0 && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-500">
                {contacts.length} contatos capturados
              </p>
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto space-y-2">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
              >
                <div>
                  <p className="text-sm font-mono font-medium">{contact.number}</p>
                  <p className="text-xs text-muted-foreground">{contact.timestamp}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  contact.type === "call" 
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-purple-500/20 text-purple-500"
                }`}>
                  {contact.type === "call" ? "Chamada" : "Mensagem"}
                </span>
              </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <PhoneCall className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum contato capturado ainda</p>
              <p className="text-xs">Inicie o monitoramento para começar</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SDExporter;
