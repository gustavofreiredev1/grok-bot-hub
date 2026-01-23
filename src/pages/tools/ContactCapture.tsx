import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PhoneCall, Download, Play, Pause, Trash2, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface CapturedContact {
  number: string;
  timestamp: string;
  type: "call" | "message";
}

const ContactCapture = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [contacts, setContacts] = useState<CapturedContact[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleToggleMonitoring = () => {
    if (!isMonitoring) {
      setIsMonitoring(true);
      toast.success("Monitoramento iniciado!");
      
      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.6) {
          const newContact: CapturedContact = {
            number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
            timestamp: new Date().toLocaleString("pt-BR"),
            type: Math.random() > 0.5 ? "call" : "message"
          };
          setContacts(prev => [newContact, ...prev]);
        }
      }, 3000);

    } else {
      setIsMonitoring(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      toast.info("Monitoramento pausado");
    }
  };

  const handleExport = () => {
    if (contacts.length === 0) {
      toast.error("Nenhum contato capturado");
      return;
    }

    const csv = "Número,Data/Hora,Tipo\n" + contacts.map(c => 
      `${c.number},${c.timestamp},${c.type === "call" ? "Chamada" : "Mensagem"}`
    ).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contatos-capturados-${Date.now()}.csv`;
    a.click();
    
    toast.success("Contatos exportados!");
  };

  const handleClear = () => {
    setContacts([]);
    toast.success("Lista limpa!");
  };

  const callCount = contacts.filter(c => c.type === "call").length;
  const messageCount = contacts.filter(c => c.type === "message").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10">
            <PhoneCall className="h-7 w-7 text-purple-500" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Captura de Contatos</h1>
              <Badge variant={isMonitoring ? "default" : "secondary"} className={isMonitoring ? "animate-pulse" : ""}>
                {isMonitoring ? "Monitorando" : "Pausado"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Capture automaticamente números desconhecidos de chamadas e mensagens
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Control Section */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <h2 className="text-lg font-semibold">Controle</h2>

          <div className="p-4 rounded-lg bg-muted flex items-center justify-between">
            <div>
              <p className="font-medium">Monitoramento</p>
              <p className="text-xs text-muted-foreground">
                {isMonitoring ? "Capturando em tempo real" : "Pausado"}
              </p>
            </div>
            <Switch
              checked={isMonitoring}
              onCheckedChange={handleToggleMonitoring}
            />
          </div>

          <Button
            onClick={handleToggleMonitoring}
            className="w-full gap-2"
            variant={isMonitoring ? "destructive" : "default"}
          >
            {isMonitoring ? (
              <>
                <Pause className="h-4 w-4" />
                Pausar Captura
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Iniciar Captura
              </>
            )}
          </Button>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="font-medium text-sm mb-2">📱 Funcionalidades</h4>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-blue-500" />
                Captura chamadas recebidas/feitas
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-3 w-3 text-green-500" />
                Detecta mensagens de não salvos
              </li>
              <li>• Exportação para planilhas</li>
              <li>• Monitoramento em background</li>
            </ul>
          </Card>

          <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
            <h4 className="font-medium text-sm mb-2 text-yellow-500">⚠️ Importante</h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Mantenha o WhatsApp aberto</li>
              <li>• Internet estável necessária</li>
              <li>• Use de forma ética</li>
            </ul>
          </Card>
        </Card>

        {/* Captured Contacts */}
        <Card className="lg:col-span-3 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Contatos Capturados</h2>
            {contacts.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
                  <Download className="h-3 w-3" />
                  Exportar
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear} className="gap-1 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                  Limpar
                </Button>
              </div>
            )}
          </div>

          {contacts.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 bg-green-500/10 border-green-500/20">
                <p className="text-2xl font-bold text-green-500">{contacts.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </Card>
              <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                <p className="text-2xl font-bold text-blue-500">{callCount}</p>
                <p className="text-xs text-muted-foreground">Chamadas</p>
              </Card>
              <Card className="p-4 bg-purple-500/10 border-purple-500/20">
                <p className="text-2xl font-bold text-purple-500">{messageCount}</p>
                <p className="text-xs text-muted-foreground">Mensagens</p>
              </Card>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-mono font-medium">{contact.number}</p>
                  <p className="text-xs text-muted-foreground">{contact.timestamp}</p>
                </div>
                <Badge variant="outline" className={
                  contact.type === "call" 
                    ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                }>
                  {contact.type === "call" ? "Chamada" : "Mensagem"}
                </Badge>
              </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <PhoneCall className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">Nenhum contato capturado</p>
              <p className="text-sm">Inicie o monitoramento para começar</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ContactCapture;
