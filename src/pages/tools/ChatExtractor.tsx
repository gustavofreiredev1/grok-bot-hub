import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Download, Chrome, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ChatContact {
  name: string;
  number: string;
  messages: number;
  saved: boolean;
}

const ChatExtractor = () => {
  const [chatUrl, setChatUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [chatContacts, setChatContacts] = useState<ChatContact[]>([]);

  const handleExtract = async () => {
    if (!chatUrl.trim()) {
      toast.error("Digite a URL do chat do WhatsApp Web");
      return;
    }

    setIsExtracting(true);
    toast.info("Extraindo contatos do chat...");

    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockContacts = Array.from({ length: 18 }, (_, i) => ({
      name: i % 3 === 0 ? `Contato ${i + 1}` : "Não Salvo",
      number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
      messages: Math.floor(Math.random() * 100) + 1,
      saved: i % 3 === 0
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

    const csv = "Nome,Número,Mensagens,Salvo\n" + chatContacts.map(c => 
      `${c.name},${c.number},${c.messages},${c.saved ? "Sim" : "Não"}`
    ).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-contatos-${Date.now()}.csv`;
    a.click();
    
    toast.success("Contatos exportados!");
  };

  const savedCount = chatContacts.filter(c => c.saved).length;
  const unsavedCount = chatContacts.filter(c => !c.saved).length;
  const totalMessages = chatContacts.reduce((sum, c) => sum + c.messages, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/10">
          <MessageCircle className="h-7 w-7 text-teal-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Extrator de Chats</h1>
          <p className="text-muted-foreground mt-1">
            Extraia contatos de conversas do WhatsApp Web via extensão Chrome
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Config Section */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Chrome className="h-5 w-5 text-teal-500" />
            <h2 className="text-lg font-semibold">Configuração</h2>
          </div>

          <Card className="p-4 bg-blue-500/5 border-blue-500/20">
            <h4 className="font-medium text-sm mb-3">📥 Como Instalar</h4>
            <ol className="text-xs space-y-2 list-decimal list-inside text-muted-foreground">
              <li>Baixe a extensão para Chrome</li>
              <li>Acesse <code className="bg-muted px-1 rounded">chrome://extensions</code></li>
              <li>Ative o "Modo desenvolvedor"</li>
              <li>Clique em "Carregar sem compactação"</li>
              <li>Selecione a pasta da extensão</li>
            </ol>
            <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
              <ExternalLink className="h-3 w-3" />
              Baixar Extensão
            </Button>
          </Card>

          <div className="space-y-4">
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
              className="w-full gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              {isExtracting ? "Extraindo..." : "Extrair Contatos"}
            </Button>
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="font-medium text-sm mb-2">✨ Recursos</h4>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li>• Extrai chats individuais e grupos</li>
              <li>• Identifica contatos salvos e não salvos</li>
              <li>• Conta mensagens por contato</li>
              <li>• Exportação automática CSV</li>
            </ul>
          </Card>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-3 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Contatos do Chat</h2>
            {chatContacts.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
                <Download className="h-3 w-3" />
                Exportar CSV
              </Button>
            )}
          </div>

          {chatContacts.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 bg-primary/10 border-primary/20">
                <p className="text-2xl font-bold text-primary">{chatContacts.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </Card>
              <Card className="p-4 bg-orange-500/10 border-orange-500/20">
                <p className="text-2xl font-bold text-orange-500">{unsavedCount}</p>
                <p className="text-xs text-muted-foreground">Não Salvos</p>
              </Card>
              <Card className="p-4 bg-teal-500/10 border-teal-500/20">
                <p className="text-2xl font-bold text-teal-500">{totalMessages}</p>
                <p className="text-xs text-muted-foreground">Mensagens</p>
              </Card>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {chatContacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{contact.name}</p>
                    {!contact.saved && (
                      <Badge variant="outline" className="text-[10px] bg-orange-500/10 text-orange-500 border-orange-500/20">
                        Não Salvo
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{contact.number}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {contact.messages} msgs
                </Badge>
              </div>
            ))}
          </div>

          {chatContacts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">Nenhum contato extraído</p>
              <p className="text-sm">Cole a URL do chat e clique em Extrair</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatExtractor;
