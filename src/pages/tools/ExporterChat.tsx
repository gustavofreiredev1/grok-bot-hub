import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Download, Chrome } from "lucide-react";
import { toast } from "sonner";

const ExporterChat = () => {
  const [chatUrl, setChatUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [chatContacts, setChatContacts] = useState<{ name: string; number: string; messages: number }[]>([]);

  const handleExtract = async () => {
    if (!chatUrl.trim()) {
      toast.error("Digite a URL do chat do WhatsApp Web");
      return;
    }

    setIsExtracting(true);
    toast.info("Extraindo contatos do chat...");

    // Simulação de extração
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockContacts = Array.from({ length: 15 }, (_, i) => ({
      name: i % 3 === 0 ? `Contato ${i + 1}` : "Não Salvo",
      number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
      messages: Math.floor(Math.random() * 50) + 1
    }));

    setChatContacts(mockContacts);
    setIsExtracting(false);
    toast.success(`${mockContacts.length} contatos extraídos!`);
  };

  const handleExport = () => {
    if (chatContacts.length === 0) {
      toast.error("Nenhum contato para exportar");
      return;
    }

    const csv = "Nome,Número,Mensagens\n" + chatContacts.map(c => `${c.name},${c.number},${c.messages}`).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-contatos-${Date.now()}.csv`;
    a.click();
    
    toast.success("Contatos exportados!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exporter Chat</h1>
          <p className="text-muted-foreground">
            Extensão Chrome para extrair contatos de conversas do WhatsApp Web
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Chrome className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Configuração</h2>
          </div>

          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-3">
            <h3 className="font-semibold text-sm">📥 Como Instalar:</h3>
            <ol className="text-xs space-y-2 list-decimal list-inside">
              <li>Baixe a extensão para Google Chrome</li>
              <li>Vá em chrome://extensions/</li>
              <li>Ative o "Modo do desenvolvedor"</li>
              <li>Clique em "Carregar sem compactação"</li>
              <li>Selecione a pasta da extensão</li>
              <li>Acesse o WhatsApp Web</li>
            </ol>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-url">URL do Chat (WhatsApp Web)</Label>
            <Input
              id="chat-url"
              placeholder="https://web.whatsapp.com/..."
              value={chatUrl}
              onChange={(e) => setChatUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Abra o chat no WhatsApp Web e cole a URL
            </p>
          </div>

          <Button
            onClick={handleExtract}
            disabled={isExtracting}
            className="w-full"
          >
            {isExtracting ? "Extraindo..." : "Extrair Contatos"}
          </Button>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
            <h3 className="font-semibold text-sm">✨ Recursos:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Extração de chats individuais ou grupos</li>
              <li>Captura contatos salvos e desconhecidos</li>
              <li>Exportação automática para CSV</li>
              <li>Instalação remota e simples</li>
              <li>Não requer acesso root/admin</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 space-y-2">
            <h3 className="font-semibold text-sm">⚠️ Requisitos:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
              <li>Google Chrome instalado</li>
              <li>WhatsApp Web conectado</li>
              <li>Internet estável</li>
              <li>Permissões da extensão aceitas</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contatos do Chat</h2>
            {chatContacts.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            )}
          </div>

          {chatContacts.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-primary/10 border-primary/20">
                <p className="text-2xl font-bold text-primary">{chatContacts.length}</p>
                <p className="text-xs text-muted-foreground">Total de Contatos</p>
              </Card>
              <Card className="p-4 bg-orange-500/10 border-orange-500/20">
                <p className="text-2xl font-bold text-orange-500">
                  {chatContacts.filter(c => c.name === "Não Salvo").length}
                </p>
                <p className="text-xs text-muted-foreground">Não Salvos</p>
              </Card>
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto space-y-2">
            {chatContacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{contact.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{contact.messages} msgs</p>
                </div>
              </div>
            ))}
          </div>

          {chatContacts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum contato extraído ainda</p>
              <p className="text-xs">Cole a URL do chat e clique em Extrair</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ExporterChat;
