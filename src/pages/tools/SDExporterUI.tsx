import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Download, Search, Filter } from "lucide-react";
import { toast } from "sonner";

const SDExporterUI = () => {
  const [timeRange, setTimeRange] = useState("today");
  const [minMessages, setMinMessages] = useState("1");
  const [isScanning, setIsScanning] = useState(false);
  const [unknownContacts, setUnknownContacts] = useState<{ number: string; messages: number; lastSeen: string }[]>([]);

  const handleScan = async () => {
    setIsScanning(true);
    toast.info("Escaneando conversas...");

    // Simulação de scan
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockContacts = Array.from({ length: 20 }, (_, i) => ({
      number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
      messages: Math.floor(Math.random() * 30) + 1,
      lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR")
    }));

    setUnknownContacts(mockContacts);
    setIsScanning(false);
    toast.success(`${mockContacts.length} contatos desconhecidos encontrados!`);
  };

  const handleExport = () => {
    if (unknownContacts.length === 0) {
      toast.error("Nenhum contato para exportar");
      return;
    }

    const csv = "Número,Mensagens,Última Visualização\n" + unknownContacts.map(c => `${c.number},${c.messages},${c.lastSeen}`).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contatos-desconhecidos-${Date.now()}.csv`;
    a.click();
    
    toast.success("Contatos exportados!");
  };

  const handleSaveToPhone = () => {
    if (unknownContacts.length === 0) {
      toast.error("Nenhum contato para salvar");
      return;
    }

    const vcf = unknownContacts.map(c => 
      `BEGIN:VCARD\nVERSION:3.0\nFN:Contato WhatsApp\nTEL:${c.number}\nEND:VCARD`
    ).join("\n\n");
    
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contatos-${Date.now()}.vcf`;
    a.click();
    
    toast.success("VCF criado! Importe no seu telefone");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">SDExporter UI</h1>
          <p className="text-muted-foreground">
            Interface visual para extrair e gerenciar contatos desconhecidos
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Filtros de Busca</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="time-range">Período de Busca</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger id="time-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="all">Todo Período</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-messages">Mínimo de Mensagens</Label>
              <Input
                id="min-messages"
                type="number"
                min="1"
                value={minMessages}
                onChange={(e) => setMinMessages(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Filtrar contatos com pelo menos X mensagens
              </p>
            </div>

            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full"
            >
              <Search className="mr-2 h-4 w-4" />
              {isScanning ? "Escaneando..." : "Escanear Conversas"}
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
            <h3 className="font-semibold text-sm">🎯 Funcionalidades:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Interface intuitiva e fácil de usar</li>
              <li>Filtros avançados por período e atividade</li>
              <li>Exportação para CSV ou contatos VCF</li>
              <li>Visualização clara dos resultados</li>
              <li>Integração com CRMs e planilhas</li>
              <li>Automatização escalável para empresas</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted space-y-2">
            <h3 className="font-semibold text-sm">💼 Ideal Para:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
              <li>Empresas de marketing digital</li>
              <li>Equipes de vendas e prospecção</li>
              <li>Atendimento ao cliente</li>
              <li>Gestão de relacionamento</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contatos Desconhecidos</h2>
            {unknownContacts.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={handleSaveToPhone}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  VCF
                </Button>
              </div>
            )}
          </div>

          {unknownContacts.length > 0 && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-500">{unknownContacts.length}</p>
                  <p className="text-xs text-muted-foreground">Contatos Encontrados</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {unknownContacts.reduce((sum, c) => sum + c.messages, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total de Mensagens</p>
                </div>
              </div>
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto space-y-2">
            {unknownContacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
              >
                <div className="flex-1">
                  <p className="text-sm font-mono font-medium">{contact.number}</p>
                  <p className="text-xs text-muted-foreground">
                    Última visualização: {contact.lastSeen}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                    {contact.messages} msgs
                  </p>
                </div>
              </div>
            ))}
          </div>

          {unknownContacts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum contato encontrado ainda</p>
              <p className="text-xs">Configure os filtros e clique em Escanear</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SDExporterUI;
