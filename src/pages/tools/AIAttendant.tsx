import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, MessageSquare, Settings, Play, Save, Sparkles, Zap, History, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const AIAttendant = () => {
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("Você é um atendente prestativo do WhatsApp. Responda de forma clara, amigável e profissional. Sempre busque resolver as dúvidas do cliente de forma eficiente.");
  const [model, setModel] = useState("gpt-4");
  const [isActive, setIsActive] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveConfig = () => {
    if (!apiKey) {
      toast.error("Preencha a chave API do OpenAI");
      return;
    }
    toast.success("Configurações salvas com sucesso!");
  };

  const handleTestMessage = async () => {
    if (!testMessage) {
      toast.error("Digite uma mensagem de teste");
      return;
    }
    
    setIsLoading(true);
    toast.info("Processando com IA...");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTestResponse("Olá! Sou o assistente virtual e estou aqui para ajudar você. Como posso auxiliar hoje? 😊");
    setIsLoading(false);
    toast.success("Resposta gerada!");
  };

  const conversationHistory = [
    { role: "user", message: "Olá, preciso de ajuda", time: "10:30" },
    { role: "assistant", message: "Olá! Como posso ajudar você hoje?", time: "10:30" },
    { role: "user", message: "Qual o horário de funcionamento?", time: "10:31" },
    { role: "assistant", message: "Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.", time: "10:31" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Bot className="h-7 w-7 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Atendente IA</h1>
              <Badge variant={isActive ? "default" : "secondary"} className="gap-1">
                {isActive ? <CheckCircle className="h-3 w-3" /> : null}
                {isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Chatbot inteligente com GPT-4 para atendimento automático 24/7
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span className={`text-sm font-medium ${isActive ? "text-green-500" : "text-muted-foreground"}`}>
              {isActive ? "Ligado" : "Desligado"}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="config" className="gap-2">
            <Settings className="h-4 w-4" />
            Configuração
          </TabsTrigger>
          <TabsTrigger value="test" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Testar
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Configurações da IA</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Chave API OpenAI</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Obtenha em <span className="text-primary">platform.openai.com</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Modelo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["gpt-4", "gpt-3.5-turbo"].map((m) => (
                      <Button
                        key={m}
                        variant={model === m ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setModel(m)}
                      >
                        {m === "gpt-4" ? "GPT-4 (Recomendado)" : "GPT-3.5 Turbo"}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt do Sistema</Label>
                  <Textarea
                    id="prompt"
                    rows={6}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Defina a personalidade e instruções do bot..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Configure como o bot deve se comportar e responder
                  </p>
                </div>

                <Button onClick={handleSaveConfig} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Como Funciona</h3>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">1</span>
                    <span className="flex-1">Configure sua chave API do OpenAI</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">2</span>
                    <span className="flex-1">Personalize o prompt do sistema</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">3</span>
                    <span className="flex-1">Ative o atendente e teste</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">4</span>
                    <span className="flex-1">Mensagens recebidas serão respondidas pela IA</span>
                  </li>
                </ol>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-primary">1,234</p>
                    <p className="text-xs text-muted-foreground">Mensagens Hoje</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-green-500">98.5%</p>
                    <p className="text-xs text-muted-foreground">Taxa de Sucesso</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">2.3s</p>
                    <p className="text-xs text-muted-foreground">Tempo Médio</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Conversas Ativas</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Test Tab */}
        <TabsContent value="test">
          <Card className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Testar Atendente</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-message">Mensagem de Teste</Label>
                <Textarea
                  id="test-message"
                  rows={4}
                  placeholder="Digite uma mensagem como se fosse um cliente..."
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleTestMessage} 
                className="w-full gap-2"
                disabled={isLoading}
              >
                <Play className="h-4 w-4" />
                {isLoading ? "Processando..." : "Enviar Teste"}
              </Button>

              {testResponse && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Resposta da IA:</p>
                  </div>
                  <p className="text-sm text-foreground">{testResponse}</p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Histórico de Conversas</h2>
              </div>
              <Button variant="outline" size="sm">Exportar</Button>
            </div>

            <div className="space-y-4">
              {conversationHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    msg.role === "assistant" ? "bg-primary/20" : "bg-muted"
                  }`}>
                    {msg.role === "assistant" ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <span className="text-xs">👤</span>
                    )}
                  </div>
                  <div className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === "assistant" 
                      ? "bg-card border border-border" 
                      : "bg-primary/10"
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAttendant;
