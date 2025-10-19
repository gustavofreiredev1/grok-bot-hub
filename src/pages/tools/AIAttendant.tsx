import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Bot, MessageSquare, Settings, Play, Save } from "lucide-react";
import { toast } from "sonner";

const AIAttendant = () => {
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("Você é um atendente prestativo do WhatsApp. Responda de forma clara e profissional.");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");

  const handleSaveConfig = () => {
    if (!apiKey || !webhookUrl) {
      toast.error("Preencha a chave API e a URL do webhook");
      return;
    }
    toast.success("Configurações salvas com sucesso!");
  };

  const handleTestMessage = async () => {
    if (!testMessage) {
      toast.error("Digite uma mensagem de teste");
      return;
    }
    toast.info("Enviando para IA...");
    // Simulação de resposta
    setTimeout(() => {
      setTestResponse("Resposta simulada da IA: Olá! Como posso ajudar você hoje?");
      toast.success("Resposta recebida!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bot className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Atendente IA ChatGPT</h1>
          <p className="text-muted-foreground">
            Configure seu chatbot inteligente para WhatsApp com respostas 24/7
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Configurações</h2>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="active-switch">Ativo</Label>
              <Switch
                id="active-switch"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
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
                Obtenha sua chave em platform.openai.com
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook">URL do Webhook WhatsApp</Label>
              <Input
                id="webhook"
                placeholder="https://api.whatsapp.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt do Sistema</Label>
              <Textarea
                id="prompt"
                rows={6}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Defina a personalidade e instruções do seu bot..."
              />
              <p className="text-xs text-muted-foreground">
                Configure como o bot deve se comportar e responder
              </p>
            </div>

            <Button onClick={handleSaveConfig} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Testar IA</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-message">Mensagem de Teste</Label>
              <Textarea
                id="test-message"
                rows={4}
                placeholder="Digite uma mensagem para testar o bot..."
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
              />
            </div>

            <Button onClick={handleTestMessage} className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Enviar Teste
            </Button>

            {testResponse && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium mb-2">Resposta da IA:</p>
                <p className="text-sm text-foreground">{testResponse}</p>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <h3 className="font-semibold mb-2">Como Funciona:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
              <li>Configure sua chave API do OpenAI</li>
              <li>Defina o webhook do WhatsApp Business</li>
              <li>Personalize o prompt do sistema</li>
              <li>Ative o atendente</li>
              <li>Mensagens recebidas serão processadas pela IA</li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIAttendant;
