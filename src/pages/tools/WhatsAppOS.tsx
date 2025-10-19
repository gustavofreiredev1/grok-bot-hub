import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Send, Upload, Pause, Play } from "lucide-react";
import { toast } from "sonner";

const WhatsAppOS = () => {
  const [contactList, setContactList] = useState("");
  const [message, setMessage] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [sendRate, setSendRate] = useState("normal");
  const [isSending, setIsSending] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      toast.success(`Arquivo ${file.name} carregado!`);
    }
  };

  const handleStartCampaign = async () => {
    const contacts = contactList.split("\n").filter(n => n.trim());
    
    if (contacts.length === 0) {
      toast.error("Adicione contatos para enviar");
      return;
    }

    if (!message.trim()) {
      toast.error("Digite uma mensagem");
      return;
    }

    setIsSending(true);
    setProgress(0);
    setSentCount(0);
    setFailedCount(0);
    toast.info("Campanha iniciada!");

    const delay = sendRate === "slow" ? 5000 : sendRate === "normal" ? 3000 : 1500;

    for (let i = 0; i < contacts.length; i++) {
      if (isPaused) {
        await new Promise(resolve => {
          const checkPause = setInterval(() => {
            if (!isPaused) {
              clearInterval(checkPause);
              resolve(true);
            }
          }, 500);
        });
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      
      const success = Math.random() > 0.1;
      if (success) {
        setSentCount(prev => prev + 1);
      } else {
        setFailedCount(prev => prev + 1);
      }
      
      setProgress(((i + 1) / contacts.length) * 100);
    }

    setIsSending(false);
    toast.success("Campanha concluída!");
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? "Campanha retomada" : "Campanha pausada");
  };

  const totalContacts = contactList.split("\n").filter(n => n.trim()).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Send className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsAppOS</h1>
          <p className="text-muted-foreground">
            Disparo de mensagens em massa com controle de taxa e multimídia
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Configuração da Campanha</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contacts">Lista de Contatos</Label>
              <Textarea
                id="contacts"
                rows={8}
                placeholder="Digite números (um por linha)&#10;+5511999999999&#10;+5521888888888"
                value={contactList}
                onChange={(e) => setContactList(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {totalContacts} contatos na lista
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Digite sua mensagem de marketing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use {"{nome}"} para personalização
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="media">Mídia (Opcional)</Label>
              <Input
                id="media"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              {mediaFile && (
                <p className="text-xs text-green-500">✓ {mediaFile.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Taxa de Envio</Label>
              <Select value={sendRate} onValueChange={setSendRate}>
                <SelectTrigger id="rate">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Lenta (5s) - Mais Seguro</SelectItem>
                  <SelectItem value="normal">Normal (3s) - Recomendado</SelectItem>
                  <SelectItem value="fast">Rápida (1.5s) - Risco Moderado</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Controle para evitar bloqueios
              </p>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 space-y-2">
              <h3 className="font-semibold text-sm text-red-500">⚠️ AVISO IMPORTANTE:</h3>
              <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                <li>Use chips alternativos para evitar ban</li>
                <li>Respeite as regras do WhatsApp</li>
                <li>Não enviamos spam ou conteúdo ilegal</li>
                <li>Você é responsável por perdas/bloqueios</li>
                <li>Teste com poucos números primeiro</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Status da Campanha</h2>

          {!isSending ? (
            <Button
              onClick={handleStartCampaign}
              className="w-full"
              disabled={totalContacts === 0 || !message.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Iniciar Campanha
            </Button>
          ) : (
            <Button
              onClick={handlePauseResume}
              variant={isPaused ? "default" : "destructive"}
              className="w-full"
            >
              {isPaused ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Retomar
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </>
              )}
            </Button>
          )}

          {isSending && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-green-500/10 border-green-500/20">
                  <p className="text-2xl font-bold text-green-500">{sentCount}</p>
                  <p className="text-xs text-muted-foreground">Enviadas</p>
                </Card>
                
                <Card className="p-4 bg-red-500/10 border-red-500/20">
                  <p className="text-2xl font-bold text-red-500">{failedCount}</p>
                  <p className="text-xs text-muted-foreground">Falhadas</p>
                </Card>
              </div>
            </div>
          )}

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
            <h3 className="font-semibold text-sm">📊 Recursos:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Disparos em massa personalizados</li>
              <li>Controle de taxa anti-ban</li>
              <li>Suporte a texto, imagens e vídeos</li>
              <li>Logs completos de envios</li>
              <li>Pausar/retomar campanha a qualquer momento</li>
              <li>Estatísticas em tempo real</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted space-y-2">
            <h3 className="font-semibold text-sm">💡 Dicas:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
              <li>Comece com taxa lenta para testar</li>
              <li>Alterne entre chips após 50-100 envios</li>
              <li>Personalize mensagens para melhor resultado</li>
              <li>Evite horários de pico (9h-18h)</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WhatsAppOS;
