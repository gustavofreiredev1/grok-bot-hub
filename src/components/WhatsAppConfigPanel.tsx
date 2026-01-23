import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Trash2,
  Settings,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Smartphone,
} from "lucide-react";
import { useWhatsAppConfig, WhatsAppInstance } from "@/hooks/useWhatsAppConfig";
import { toast } from "sonner";

interface WhatsAppConfigPanelProps {
  trigger?: React.ReactNode;
}

export const WhatsAppConfigPanel = ({ trigger }: WhatsAppConfigPanelProps) => {
  const {
    instances,
    activeInstance,
    addInstance,
    updateInstance,
    removeInstance,
    setActiveInstance,
    testConnection,
    isLoading,
  } = useWhatsAppConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [newInstance, setNewInstance] = useState({
    name: "",
    phoneNumber: "",
    apiKey: "",
    apiUrl: "https://api.evolution.ai",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleAddInstance = async () => {
    if (!newInstance.name || !newInstance.phoneNumber || !newInstance.apiKey) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsAdding(true);
    await addInstance(newInstance);
    setNewInstance({ name: "", phoneNumber: "", apiKey: "", apiUrl: "https://api.evolution.ai" });
    setIsAdding(false);
  };

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    await testConnection(id);
    setTestingId(null);
  };

  const handleUpdateField = (id: string, field: keyof WhatsAppInstance, value: string) => {
    updateInstance(id, { [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurar WhatsApp
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Configuração do WhatsApp
          </DialogTitle>
          <DialogDescription>
            Configure suas instâncias do WhatsApp para que as ferramentas funcionem corretamente.
            Você pode adicionar até 3 números.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Instances List */}
          {instances.length > 0 ? (
            <Tabs defaultValue={activeInstance?.id || instances[0]?.id} className="w-full">
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${instances.length}, 1fr)` }}>
                {instances.map((instance, index) => (
                  <TabsTrigger
                    key={instance.id}
                    value={instance.id}
                    onClick={() => setActiveInstance(instance.id)}
                    className="gap-2"
                  >
                    {instance.isConnected ? (
                      <Wifi className="h-3 w-3 text-green-500" />
                    ) : (
                      <WifiOff className="h-3 w-3 text-muted-foreground" />
                    )}
                    {instance.name || `Número ${index + 1}`}
                  </TabsTrigger>
                ))}
              </TabsList>

              {instances.map((instance) => (
                <TabsContent key={instance.id} value={instance.id} className="space-y-4 mt-4">
                  <Card className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={instance.isConnected ? "default" : "secondary"}>
                          {instance.isConnected ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Conectado
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Desconectado
                            </>
                          )}
                        </Badge>
                        {instance.lastSync && (
                          <span className="text-xs text-muted-foreground">
                            Última sincronização: {new Date(instance.lastSync).toLocaleString("pt-BR")}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(instance.id)}
                          disabled={testingId === instance.id}
                        >
                          <RefreshCw className={`h-4 w-4 mr-1 ${testingId === instance.id ? "animate-spin" : ""}`} />
                          Testar
                        </Button>
                        {instances.length > 1 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeInstance(instance.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome de Identificação</Label>
                        <Input
                          value={instance.name}
                          onChange={(e) => handleUpdateField(instance.id, "name", e.target.value)}
                          placeholder="Ex: WhatsApp Principal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Número do WhatsApp</Label>
                        <Input
                          value={instance.phoneNumber}
                          onChange={(e) => handleUpdateField(instance.id, "phoneNumber", e.target.value)}
                          placeholder="+5511999999999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>URL da API (Evolution API / WhatsApp Business)</Label>
                      <Input
                        value={instance.apiUrl}
                        onChange={(e) => handleUpdateField(instance.id, "apiUrl", e.target.value)}
                        placeholder="https://api.evolution.ai"
                      />
                      <p className="text-xs text-muted-foreground">
                        Endereço do servidor Evolution API ou WhatsApp Business API
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Chave de API (API Key / Token)</Label>
                      <Input
                        type="password"
                        value={instance.apiKey}
                        onChange={(e) => handleUpdateField(instance.id, "apiKey", e.target.value)}
                        placeholder="Sua chave de API secreta"
                      />
                      <p className="text-xs text-muted-foreground">
                        Obtenha sua chave no painel da Evolution API ou WhatsApp Business
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <Card className="p-8 text-center">
              <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2">Nenhuma instância configurada</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Adicione sua primeira instância do WhatsApp para começar
              </p>
            </Card>
          )}

          {/* Add New Instance */}
          {instances.length < 3 && (
            <Card className="p-4 border-dashed">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Nova Instância ({instances.length}/3)
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={newInstance.name}
                    onChange={(e) => setNewInstance({ ...newInstance, name: e.target.value })}
                    placeholder="Ex: WhatsApp Vendas"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Número</Label>
                  <Input
                    value={newInstance.phoneNumber}
                    onChange={(e) => setNewInstance({ ...newInstance, phoneNumber: e.target.value })}
                    placeholder="+5511999999999"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="space-y-2">
                  <Label>URL da API</Label>
                  <Input
                    value={newInstance.apiUrl}
                    onChange={(e) => setNewInstance({ ...newInstance, apiUrl: e.target.value })}
                    placeholder="https://api.evolution.ai"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Chave de API</Label>
                  <Input
                    type="password"
                    value={newInstance.apiKey}
                    onChange={(e) => setNewInstance({ ...newInstance, apiKey: e.target.value })}
                    placeholder="Sua chave secreta"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddInstance}
                className="w-full mt-4"
                disabled={isAdding}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isAdding ? "Adicionando..." : "Adicionar Instância"}
              </Button>
            </Card>
          )}

          {/* Help Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h4 className="font-semibold text-sm mb-2">📱 Evolution API</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Solução open-source para WhatsApp</li>
                <li>• Suporte a múltiplas instâncias</li>
                <li>• Webhooks e mensagens em massa</li>
                <li>• Gratuito para auto-hospedagem</li>
              </ul>
            </Card>
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h4 className="font-semibold text-sm mb-2">💼 WhatsApp Business API</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• API oficial da Meta</li>
                <li>• Alta confiabilidade</li>
                <li>• Sem risco de bloqueio</li>
                <li>• Requer aprovação comercial</li>
              </ul>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
