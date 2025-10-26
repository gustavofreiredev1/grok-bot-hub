import { useState } from "react";
import { BotCard } from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Search, Filter, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allBots = [
  { name: "Atendente IA ChatGPT", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "WhatsFilter", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "Exporter Group", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "SDExporter", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "Exporter Chat", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "SDExporter UI", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "WhatsAppOS", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
];

interface WhatsAppConfig {
  id: number;
  name: string;
  phoneNumber: string;
  apiKey: string;
}

const Bots = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [whatsappConfigs, setWhatsappConfigs] = useState<WhatsAppConfig[]>([
    { id: 1, name: "", phoneNumber: "", apiKey: "" }
  ]);

  const handleAddNumber = () => {
    if (whatsappConfigs.length >= 3) {
      toast.error("Limite máximo de 3 números atingido");
      return;
    }
    setWhatsappConfigs([
      ...whatsappConfigs,
      { id: Date.now(), name: "", phoneNumber: "", apiKey: "" }
    ]);
  };

  const handleRemoveNumber = (id: number) => {
    if (whatsappConfigs.length === 1) {
      toast.error("É necessário ter pelo menos 1 número configurado");
      return;
    }
    setWhatsappConfigs(whatsappConfigs.filter(config => config.id !== id));
  };

  const handleConfigChange = (id: number, field: keyof WhatsAppConfig, value: string) => {
    setWhatsappConfigs(whatsappConfigs.map(config =>
      config.id === id ? { ...config, [field]: value } : config
    ));
  };

  const handleSaveConfig = () => {
    const hasEmptyFields = whatsappConfigs.some(
      config => !config.name.trim() || !config.phoneNumber.trim() || !config.apiKey.trim()
    );
    
    if (hasEmptyFields) {
      toast.error("Preencha todos os campos de configuração");
      return;
    }
    
    toast.success("Configurações do WhatsApp salvas com sucesso!");
    setIsDialogOpen(false);
  };

  const filteredBots = allBots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ferramentas WhatsApp</h1>
          <p className="mt-1 text-muted-foreground">
            Acesse e configure todas as ferramentas disponíveis
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
              <Settings className="mr-2 h-4 w-4" />
              Configurar Bots
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configurar WhatsApp para Bots</DialogTitle>
              <DialogDescription>
                Configure até 3 números do WhatsApp para que os bots e ferramentas funcionem corretamente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Tabs defaultValue="numero-1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {whatsappConfigs.map((config, index) => (
                    <TabsTrigger key={config.id} value={`numero-${index + 1}`}>
                      Número {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {whatsappConfigs.map((config, index) => (
                  <TabsContent key={config.id} value={`numero-${index + 1}`} className="space-y-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Configuração do Número {index + 1}</h3>
                      {whatsappConfigs.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveNumber(config.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`name-${config.id}`}>Nome de Identificação</Label>
                      <Input
                        id={`name-${config.id}`}
                        placeholder="Ex: WhatsApp Principal"
                        value={config.name}
                        onChange={(e) => handleConfigChange(config.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${config.id}`}>Número do WhatsApp</Label>
                      <Input
                        id={`phone-${config.id}`}
                        placeholder="Ex: +5511999999999"
                        value={config.phoneNumber}
                        onChange={(e) => handleConfigChange(config.id, 'phoneNumber', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`api-${config.id}`}>API Key do WhatsApp</Label>
                      <Input
                        id={`api-${config.id}`}
                        type="password"
                        placeholder="Cole sua chave API aqui"
                        value={config.apiKey}
                        onChange={(e) => handleConfigChange(config.id, 'apiKey', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Obtenha sua API Key no painel da Evolution API ou WhatsApp Business API
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              
              {whatsappConfigs.length < 3 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddNumber}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Outro Número ({whatsappConfigs.length}/3)
                </Button>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveConfig}>
                Salvar Configurações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar ferramentas..."
            className="pl-10 bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBots.length > 0 ? (
          filteredBots.map((bot) => (
            <BotCard key={bot.name} {...bot} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Nenhuma ferramenta encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bots;
