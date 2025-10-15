import { BotCard } from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Search, Filter } from "lucide-react";

const allBots = [
  { name: "Bot Atendimento", status: "active" as const, groups: 45, contacts: 1200, messages: 5400 },
  { name: "Bot Marketing", status: "active" as const, groups: 32, contacts: 890, messages: 3200 },
  { name: "Bot Suporte", status: "error" as const, groups: 28, contacts: 650, messages: 2100 },
  { name: "Bot Vendas", status: "active" as const, groups: 51, contacts: 1500, messages: 6800 },
  { name: "Bot Newsletter", status: "inactive" as const, groups: 15, contacts: 420, messages: 1200 },
  { name: "Bot FAQ", status: "active" as const, groups: 38, contacts: 980, messages: 4100 },
];

const Bots = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Bots</h1>
          <p className="mt-1 text-muted-foreground">
            Controle e monitore todos os seus bots
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
          <Bot className="mr-2 h-4 w-4" />
          Adicionar Bot
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar bots..."
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allBots.map((bot) => (
          <BotCard key={bot.name} {...bot} />
        ))}
      </div>
    </div>
  );
};

export default Bots;
