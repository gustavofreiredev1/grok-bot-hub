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
  { name: "Bot Atendimento", status: "active" as const, groups: 45, contacts: 1200, messages: 5400 },
  { name: "Bot Marketing", status: "active" as const, groups: 32, contacts: 890, messages: 3200 },
  { name: "Bot Suporte", status: "error" as const, groups: 28, contacts: 650, messages: 2100 },
  { name: "Bot Vendas", status: "active" as const, groups: 51, contacts: 1500, messages: 6800 },
  { name: "Bot Newsletter", status: "inactive" as const, groups: 15, contacts: 420, messages: 1200 },
  { name: "Bot FAQ", status: "active" as const, groups: 38, contacts: 980, messages: 4100 },
];

const Bots = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newBotName, setNewBotName] = useState("");
  const [newBotType, setNewBotType] = useState("vendas");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateBot = () => {
    if (!newBotName.trim()) {
      toast.error("Digite um nome para o bot");
      return;
    }
    toast.success(`Bot "${newBotName}" criado com sucesso!`);
    setNewBotName("");
    setNewBotType("vendas");
    setIsDialogOpen(false);
  };

  const filteredBots = allBots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Bots</h1>
          <p className="mt-1 text-muted-foreground">
            Controle e monitore todos os seus bots
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
              <Bot className="mr-2 h-4 w-4" />
              Adicionar Bot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Bot</DialogTitle>
              <DialogDescription>
                Configure as informações básicas do seu bot
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Nome do Bot</Label>
                <Input
                  id="bot-name"
                  placeholder="Ex: Bot Atendimento"
                  value={newBotName}
                  onChange={(e) => setNewBotName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-type">Tipo do Bot</Label>
                <Select value={newBotType} onValueChange={setNewBotType}>
                  <SelectTrigger id="bot-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendas">Bot de Vendas</SelectItem>
                    <SelectItem value="suporte">Bot de Suporte</SelectItem>
                    <SelectItem value="marketing">Bot de Marketing</SelectItem>
                    <SelectItem value="custom">Bot Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateBot}>
                Criar Bot
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar bots..."
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
            <p className="text-muted-foreground">Nenhum bot encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bots;
