import { Bot, MessageSquare, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Calendar, Clock } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { tools } from "@/data/tools";

const stats = [
  {
    title: "Ferramentas Ativas",
    value: "7",
    icon: Zap,
    trend: { value: "2 novas", isPositive: true },
    color: "primary" as const,
  },
  {
    title: "Mensagens Hoje",
    value: "1,234",
    icon: MessageSquare,
    trend: { value: "12.3%", isPositive: true },
    color: "success" as const,
  },
  {
    title: "Contatos Extraídos",
    value: "8,456",
    icon: Users,
    trend: { value: "23.1%", isPositive: true },
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

const chartData = [
  { name: "Seg", mensagens: 4000, contatos: 240 },
  { name: "Ter", mensagens: 3000, contatos: 180 },
  { name: "Qua", mensagens: 5000, contatos: 300 },
  { name: "Qui", mensagens: 4500, contatos: 270 },
  { name: "Sex", mensagens: 6000, contatos: 360 },
  { name: "Sáb", mensagens: 3500, contatos: 210 },
  { name: "Dom", mensagens: 2800, contatos: 168 },
];

const recentActivities = [
  { action: "Extração de grupo", tool: "Extrator Grupos", status: "success", time: "2 min", count: 125 },
  { action: "Validação de números", tool: "Validador", status: "success", time: "15 min", count: 500 },
  { action: "Disparo em massa", tool: "Disparador", status: "running", time: "30 min", count: 89 },
  { action: "Captura de contatos", tool: "Captura Contatos", status: "success", time: "1h", count: 34 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, subscription } = useAuth();

  const userName = profile?.full_name?.split(" ")[0] || "Usuário";
  const planName = subscription?.plan?.name || "Starter";

  const quickTools = tools.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Olá, {userName}! 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            Aqui está um resumo das suas automações de hoje
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate("/flows")}
          >
            <Calendar className="h-4 w-4" />
            Ver Fluxos
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow gap-2"
            onClick={() => navigate("/bots")}
          >
            <Zap className="h-4 w-4" />
            Ferramentas
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2 bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Atividade Semanal
              </h2>
              <p className="text-sm text-muted-foreground">Mensagens e contatos processados</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              +18.2%
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMensagens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "12px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="mensagens" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorMensagens)" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="contatos" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Atividade Recente
            </h2>
            <Button variant="ghost" size="sm" className="text-xs">
              Ver tudo
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  activity.status === "success" ? "bg-green-500" :
                  activity.status === "running" ? "bg-yellow-500 animate-pulse" :
                  "bg-red-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.tool} • {activity.count} itens
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Access Tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Acesso Rápido</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/bots")}>
            Ver todas →
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id}
                className="group p-4 cursor-pointer transition-all hover:shadow-lg hover:border-primary/30 bg-gradient-card"
                onClick={() => navigate(tool.route)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{tool.shortName}</p>
                    <p className="text-xs text-muted-foreground truncate">{tool.description.slice(0, 30)}...</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Plan Status */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Plano {planName}</h3>
                {planName !== "Starter" && (
                  <Badge className="bg-primary text-primary-foreground">PRO</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {planName === "Starter" 
                  ? "Faça upgrade para desbloquear todas as ferramentas"
                  : "Você tem acesso a todas as ferramentas premium"
                }
              </p>
            </div>
          </div>
          {planName === "Starter" && (
            <Button 
              onClick={() => navigate("/pricing")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Fazer Upgrade
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
