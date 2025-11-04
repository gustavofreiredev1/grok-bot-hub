import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const FlowAnalysis = () => {
  const stats = [
    {
      title: "Execuções Totais",
      value: "1.234",
      icon: Play,
      change: "+12.5%",
      color: "text-primary",
    },
    {
      title: "Taxa de Conclusão",
      value: "87.3%",
      icon: CheckCircle,
      change: "+5.2%",
      color: "text-success",
    },
    {
      title: "Usuários Únicos",
      value: "856",
      icon: Users,
      change: "+8.1%",
      color: "text-info",
    },
    {
      title: "Tempo Médio",
      value: "2m 34s",
      icon: Clock,
      change: "-15.3%",
      color: "text-warning",
    },
  ];

  const executionData = [
    { name: "Seg", execucoes: 120, conclusoes: 105 },
    { name: "Ter", execucoes: 150, conclusoes: 130 },
    { name: "Qua", execucoes: 180, conclusoes: 165 },
    { name: "Qui", execucoes: 165, conclusoes: 145 },
    { name: "Sex", execucoes: 200, conclusoes: 180 },
    { name: "Sáb", execucoes: 140, conclusoes: 125 },
    { name: "Dom", execucoes: 110, conclusoes: 95 },
  ];

  const nodePerformance = [
    { name: "Mensagem Inicial", visualizacoes: 1234, cliques: 1180 },
    { name: "Botões Menu", visualizacoes: 1180, cliques: 1050 },
    { name: "Condição", visualizacoes: 1050, cliques: 980 },
    { name: "IA Response", visualizacoes: 980, cliques: 890 },
    { name: "Finalização", visualizacoes: 890, cliques: 856 },
  ];

  const exitPoints = [
    { name: "Conclusão Normal", value: 856, color: "hsl(var(--success))" },
    { name: "Timeout", value: 120, color: "hsl(var(--warning))" },
    { name: "Erro", value: 45, color: "hsl(var(--destructive))" },
    { name: "Abandono", value: 213, color: "hsl(var(--muted))" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Análise de Fluxos</h1>
          <p className="mt-1 text-muted-foreground">
            Métricas e performance dos seus fluxos de automação
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <BarChart3 className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Execution Chart */}
      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Execuções vs Conclusões - Últimos 7 dias
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={executionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="execucoes" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="conclusoes" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Node Performance */}
        <Card className="p-6 bg-gradient-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Performance por Nó (Funil)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nodePerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="visualizacoes" fill="hsl(var(--info))" />
              <Bar dataKey="cliques" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Exit Points */}
        <Card className="p-6 bg-gradient-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Pontos de Saída
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={exitPoints}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {exitPoints.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Flows */}
      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Fluxos Mais Executados
        </h3>
        <div className="space-y-3">
          {[
            { name: "Fluxo de Boas-Vindas", executions: 450, rate: "92%" },
            { name: "Atendimento Automatizado", executions: 380, rate: "85%" },
            { name: "Pesquisa de Satisfação", executions: 220, rate: "78%" },
            { name: "Campanha Promocional", executions: 184, rate: "88%" },
          ].map((flow, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{flow.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {flow.executions} execuções
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-success">{flow.rate}</p>
                <p className="text-xs text-muted-foreground">Taxa de conclusão</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FlowAnalysis;
