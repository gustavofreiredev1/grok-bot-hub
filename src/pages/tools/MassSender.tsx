import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Upload, Pause, Play, Image, FileText, AlertTriangle, CheckCircle, XCircle, Settings } from "lucide-react";
import { toast } from "sonner";

const MassSender = () => {
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
      toast.success(`${file.name} anexado!`);
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

      await new Promise(resolve => setTimeout(resolve, delay / 10)); // Speed up for demo
      
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
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10">
            <Send className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Disparador em Massa</h1>
              <Badge className="bg-primary text-primary-foreground">PRO</Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Envie mensagens e mídias em massa com controle anti-ban e personalização
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="campaign" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="campaign" className="gap-2">
            <Send className="h-4 w-4" />
            Campanha
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaign">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Campaign Setup */}
            <Card className="lg:col-span-3 p-6 space-y-4">
              <h2 className="text-lg font-semibold">Configurar Campanha</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contacts" className="flex items-center justify-between">
                    Lista de Contatos
                    <Badge variant="secondary">{totalContacts} contatos</Badge>
                  </Label>
                  <Textarea
                    id="contacts"
                    rows={6}
                    placeholder="Digite números (um por linha)&#10;+5511999999999&#10;+5521888888888"
                    value={contactList}
                    onChange={(e) => setContactList(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Digite sua mensagem...&#10;&#10;Use {nome} para personalização"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Mídia (Opcional)</Label>
                  <div className="relative">
                    <Input
                      id="media"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={() => document.getElementById("media")?.click()}
                    >
                      <Image className="h-4 w-4" />
                      {mediaFile ? mediaFile.name : "Anexar Imagem/Vídeo"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Taxa de Envio</Label>
                  <Select value={sendRate} onValueChange={setSendRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">🐢 Lenta (5s) - Mais Seguro</SelectItem>
                      <SelectItem value="normal">⚡ Normal (3s) - Recomendado</SelectItem>
                      <SelectItem value="fast">🚀 Rápida (1.5s) - Risco Moderado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="p-4 bg-red-500/5 border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-red-500">Aviso Importante</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                      <li>• Use chips alternativos para evitar ban</li>
                      <li>• Respeite as regras do WhatsApp</li>
                      <li>• Você é responsável pelo uso</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Card>

            {/* Campaign Status */}
            <Card className="lg:col-span-2 p-6 space-y-4">
              <h2 className="text-lg font-semibold">Status da Campanha</h2>

              {!isSending ? (
                <Button
                  onClick={handleStartCampaign}
                  className="w-full gap-2"
                  disabled={totalContacts === 0 || !message.trim()}
                  size="lg"
                >
                  <Send className="h-4 w-4" />
                  Iniciar Campanha
                </Button>
              ) : (
                <Button
                  onClick={handlePauseResume}
                  variant={isPaused ? "default" : "destructive"}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isPaused ? (
                    <>
                      <Play className="h-4 w-4" />
                      Retomar
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" />
                      Pausar
                    </>
                  )}
                </Button>
              )}

              {(isSending || sentCount > 0 || failedCount > 0) && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4 bg-green-500/10 border-green-500/20">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-2xl font-bold text-green-500">{sentCount}</p>
                          <p className="text-xs text-muted-foreground">Enviadas</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-red-500/10 border-red-500/20">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-2xl font-bold text-red-500">{failedCount}</p>
                          <p className="text-xs text-muted-foreground">Falhadas</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-medium text-sm mb-2">📊 Recursos</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>• Disparos personalizados</li>
                  <li>• Controle anti-ban</li>
                  <li>• Suporte a texto, imagens e vídeos</li>
                  <li>• Pausar/retomar a qualquer momento</li>
                  <li>• Estatísticas em tempo real</li>
                </ul>
              </Card>

              <Card className="p-4 bg-muted">
                <h4 className="font-medium text-sm mb-2">💡 Dicas</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Comece com taxa lenta para testar</li>
                  <li>• Alterne chips após 50-100 envios</li>
                  <li>• Personalize para melhor resultado</li>
                </ul>
              </Card>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Configurações Avançadas</h2>
            <p className="text-muted-foreground text-sm">
              Configurações avançadas de disparo estarão disponíveis em breve.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MassSender;
