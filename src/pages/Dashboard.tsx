import { Bot, MessageSquare, Users, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { BotCard } from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  {
    title: "Bots Ativos",
    value: "12",
    icon: Bot,
    trend: { value: "8.5%", isPositive: true },
    color: "primary" as const,
  },
  {
    title: "Mensagens Enviadas",
    value: "24.5k",
    icon: MessageSquare,
    trend: { value: "12.3%", isPositive: true },
    color: "success" as const,
  },
  {
    title: "Grupos Ativos",
    value: "156",
    icon: Users,
    trend: { value: "3.2%", isPositive: false },
    color: "info" as const,
  },
  {
    title: "Taxa de Sucesso",
    value: "98.2%",
    icon: TrendingUp,
    trend: { value: "2.1%", isPositive: true },
    color: "warning" as const,
  },
];

const bots = [
  { name: "Bot Atendimento", status: "active" as const, groups: 45, contacts: 1200, messages: 5400 },
  { name: "Bot Marketing", status: "active" as const, groups: 32, contacts: 890, messages: 3200 },
  { name: "Bot Suporte", status: "error" as const, groups: 28, contacts: 650, messages: 2100 },
  { name: "Bot Vendas", status: "active" as const, groups: 51, contacts: 1500, messages: 6800 },
];

const chartData = [
  { name: "Seg", mensagens: 4000 },
  { name: "Ter", mensagens: 3000 },
  { name: "Qua", mensagens: 5000 },
  { name: "Qui", mensagens: 4500 },
  { name: "Sex", mensagens: 6000 },
  { name: "Sáb", mensagens: 3500 },
  { name: "Dom", mensagens: 2800 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Visão geral da sua plataforma de automação
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
          <Bot className="mr-2 h-4 w-4" />
          Novo Bot
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card className="bg-gradient-card border-border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Mensagens Enviadas - Últimos 7 dias
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem"
              }} 
            />
            <Bar dataKey="mensagens" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Seus Bots</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {bots.map((bot) => (
            <BotCard key={bot.name} {...bot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
