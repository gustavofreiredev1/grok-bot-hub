import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, MessageSquare, Clock } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const messageData = [
  { date: "01/01", enviadas: 2400, recebidas: 1800 },
  { date: "05/01", enviadas: 3200, recebidas: 2200 },
  { date: "10/01", enviadas: 2800, recebidas: 2000 },
  { date: "15/01", enviadas: 4100, recebidas: 2800 },
  { date: "20/01", enviadas: 3600, recebidas: 2600 },
  { date: "25/01", enviadas: 5200, recebidas: 3400 },
  { date: "30/01", enviadas: 4800, recebidas: 3200 },
];

const engagementData = [
  { hora: "00h", interacoes: 120 },
  { hora: "04h", interacoes: 80 },
  { hora: "08h", interacoes: 450 },
  { hora: "12h", interacoes: 680 },
  { hora: "16h", interacoes: 720 },
  { hora: "20h", interacoes: 580 },
  { hora: "23h", interacoes: 340 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Análise detalhada de performance e engajamento
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Taxa de Resposta"
          value="94.2%"
          icon={TrendingUp}
          trend={{ value: "5.1%", isPositive: true }}
          color="success"
        />
        <StatCard
          title="Usuários Ativos"
          value="3.2k"
          icon={Users}
          trend={{ value: "12.5%", isPositive: true }}
          color="info"
        />
        <StatCard
          title="Mensagens/Hora"
          value="156"
          icon={MessageSquare}
          trend={{ value: "8.3%", isPositive: false }}
          color="warning"
        />
        <StatCard
          title="Tempo Médio"
          value="2.4s"
          icon={Clock}
          trend={{ value: "1.2s", isPositive: true }}
          color="primary"
        />
      </div>

      <Card className="bg-gradient-card border-border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Mensagens - Últimos 30 dias
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={messageData}>
            <defs>
              <linearGradient id="colorEnviadas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRecebidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem"
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="enviadas" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#colorEnviadas)" 
            />
            <Area 
              type="monotone" 
              dataKey="recebidas" 
              stroke="hsl(var(--accent))" 
              fillOpacity={1} 
              fill="url(#colorRecebidas)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="bg-gradient-card border-border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Engajamento por Horário
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="hora" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="interacoes" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Analytics;
