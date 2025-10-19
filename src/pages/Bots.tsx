import { useState } from "react";
import { BotCard } from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Search, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const allBots = [
  { name: "Atendente IA ChatGPT", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "WhatsFilter", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "Exporter Group", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "SDExporter", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "Exporter Chat", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "SDExporter UI", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
  { name: "WhatsAppOS", status: "active" as const, groups: 0, contacts: 0, messages: 0 },
];

const Bots = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newBotName, setNewBotName] = useState("");
  const [newBotType, setNewBotType] = useState("ia");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateBot = () => {
    if (!newBotName.trim()) {
      toast.error("Digite um nome para a ferramenta");
      return;
    }
    toast.success(`Ferramenta "${newBotName}" criada com sucesso!`);
    setNewBotName("");
    setNewBotType("ia");
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
              <Bot className="mr-2 h-4 w-4" />
              Adicionar Ferramenta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Ferramenta</DialogTitle>
              <DialogDescription>
                Configure as informações básicas da sua ferramenta WhatsApp
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Nome da Ferramenta</Label>
                <Input
                  id="bot-name"
                  placeholder="Ex: Atendente IA ChatGPT"
                  value={newBotName}
                  onChange={(e) => setNewBotName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-type">Tipo de Ferramenta</Label>
                <Select value={newBotType} onValueChange={setNewBotType}>
                  <SelectTrigger id="bot-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ia">Atendente IA ChatGPT</SelectItem>
                    <SelectItem value="filter">WhatsFilter</SelectItem>
                    <SelectItem value="group">Exporter Group</SelectItem>
                    <SelectItem value="contacts">SDExporter</SelectItem>
                    <SelectItem value="chat">Exporter Chat</SelectItem>
                    <SelectItem value="ui">SDExporter UI</SelectItem>
                    <SelectItem value="mass">WhatsAppOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateBot}>
                Criar Ferramenta
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
