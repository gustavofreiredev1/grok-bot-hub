import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Download, Search, Filter, Calendar } from "lucide-react";
import { toast } from "sonner";

interface UnknownContact {
  number: string;
  messages: number;
  lastSeen: string;
  firstContact: string;
}

const UnknownScanner = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [minMessages, setMinMessages] = useState("1");
  const [isScanning, setIsScanning] = useState(false);
  const [contacts, setContacts] = useState<UnknownContact[]>([]);

  const handleScan = async () => {
    setIsScanning(true);
    toast.info("Escaneando conversas...");

    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockContacts = Array.from({ length: 25 }, (_, i) => ({
      number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
      messages: Math.floor(Math.random() * 50) + parseInt(minMessages),
      lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR"),
      firstContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR")
    }));

    setContacts(mockContacts);
    setIsScanning(false);
    toast.success(`${mockContacts.length} contatos encontrados!`);
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error("Nenhum contato para exportar");
      return;
    }

    const csv = "Número,Mensagens,Última Vista,Primeiro Contato\n" + contacts.map(c => 
      `${c.number},${c.messages},${c.lastSeen},${c.firstContact}`
    ).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `desconhecidos-${Date.now()}.csv`;
    a.click();
    
    toast.success("CSV exportado!");
  };

  const handleExportVCF = () => {
    if (contacts.length === 0) {
      toast.error("Nenhum contato para exportar");
      return;
    }

    const vcf = contacts.map((c, i) => 
      `BEGIN:VCARD\nVERSION:3.0\nFN:Contato WhatsApp ${i + 1}\nTEL:${c.number}\nEND:VCARD`
    ).join("\n\n");
    
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contatos-${Date.now()}.vcf`;
    a.click();
    
    toast.success("VCF exportado!");
  };

  const totalMessages = contacts.reduce((sum, c) => sum + c.messages, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
          <UserPlus className="h-7 w-7 text-indigo-500" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Scanner de Desconhecidos</h1>
            <Badge className="bg-primary text-primary-foreground">PRO</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Interface visual para encontrar e exportar contatos não salvos com filtros avançados
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Filter Section */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold">Filtros de Busca</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Período de Busca
              </Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="3months">Últimos 3 Meses</SelectItem>
                  <SelectItem value="all">Todo Período</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Mínimo de Mensagens</Label>
              <Input
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
              className="w-full gap-2"
            >
              <Search className="h-4 w-4" />
              {isScanning ? "Escaneando..." : "Escanear Conversas"}
            </Button>
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="font-medium text-sm mb-2">🎯 Funcionalidades</h4>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li>• Interface visual intuitiva</li>
              <li>• Filtros por período e atividade</li>
              <li>• Exportação CSV e VCF</li>
              <li>• Visualização clara dos resultados</li>
              <li>• Integração com CRMs</li>
            </ul>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-medium text-sm mb-2">💼 Ideal Para</h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Empresas de marketing</li>
              <li>• Equipes de vendas</li>
              <li>• Atendimento ao cliente</li>
              <li>• Gestão de leads</li>
            </ul>
          </Card>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-3 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Contatos Encontrados</h2>
            {contacts.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1">
                  <Download className="h-3 w-3" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportVCF} className="gap-1">
                  <UserPlus className="h-3 w-3" />
                  VCF
                </Button>
              </div>
            )}
          </div>

          {contacts.length > 0 && (
            <Card className="p-4 bg-green-500/10 border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-500">{contacts.length}</p>
                  <p className="text-xs text-muted-foreground">Contatos Encontrados</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">{totalMessages}</p>
                  <p className="text-xs text-muted-foreground">Total de Mensagens</p>
                </div>
              </div>
            </Card>
          )}

          <div className="max-h-[450px] overflow-y-auto space-y-2">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-mono font-medium">{contact.number}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span>Primeira msg: {contact.firstContact}</span>
                    <span>•</span>
                    <span>Última: {contact.lastSeen}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {contact.messages} msgs
                </Badge>
              </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <UserPlus className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">Nenhum contato encontrado</p>
              <p className="text-sm">Configure os filtros e clique em Escanear</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UnknownScanner;
