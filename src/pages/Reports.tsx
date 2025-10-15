import { Download, FileText, BarChart3, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Reports() {
  const handleExport = (type: string) => {
    toast.success(`Exportando relatório ${type}...`);
  };

  const reportTypes = [
    {
      id: "messages",
      title: "Relatório de Mensagens",
      description: "Estatísticas completas de envio e recebimento",
      icon: MessageSquare,
      metrics: ["Total enviado", "Taxa de entrega", "Horários de pico"],
    },
    {
      id: "groups",
      title: "Relatório de Grupos",
      description: "Análise de engajamento por grupo",
      icon: Users,
      metrics: ["Membros ativos", "Taxa de resposta", "Crescimento"],
    },
    {
      id: "performance",
      title: "Relatório de Performance",
      description: "Métricas de desempenho dos bots",
      icon: TrendingUp,
      metrics: ["Uptime", "Velocidade", "Erros"],
    },
    {
      id: "analytics",
      title: "Análise Completa",
      description: "Dashboard executivo com todos os dados",
      icon: BarChart3,
      metrics: ["Visão geral", "Tendências", "Insights"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios e Exportação</h1>
        <p className="text-muted-foreground">Exporte e analise dados completos da plataforma</p>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-primary border-border">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Exportação Rápida</h2>
            <p className="text-sm text-muted-foreground">Gere relatórios personalizados</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Select defaultValue="7days">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleExport("geral")} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Exportar Geral
            </Button>
          </div>
        </div>
      </Card>

      {/* Report Types */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card key={report.id} className="p-6 bg-card border-border hover:shadow-glow transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <report.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                <div className="space-y-1 mb-4">
                  {report.metrics.map((metric, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">
                      • {metric}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(`${report.id}-pdf`)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(`${report.id}-csv`)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(`${report.id}-excel`)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Exports */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Exportações Recentes</h2>
        <div className="space-y-3">
          {[
            {
              name: "Relatório Completo - Outubro 2025",
              date: "15/10/2025",
              size: "2.4 MB",
              format: "PDF",
            },
            {
              name: "Dados de Mensagens - Semana 41",
              date: "12/10/2025",
              size: "856 KB",
              format: "CSV",
            },
            {
              name: "Performance dos Bots - Q3 2025",
              date: "08/10/2025",
              size: "1.2 MB",
              format: "Excel",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-subtle border border-border"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.date} • {item.size} • {item.format}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Guide */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 bg-gradient-primary border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">📖 Como Usar</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">1. Escolha o Período</p>
              <p>Selecione o intervalo de datas desejado</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">2. Selecione o Tipo</p>
              <p>Escolha o relatório específico</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">3. Exporte</p>
              <p>Clique no formato desejado (PDF, CSV, Excel)</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">📊 Dados Inclusos</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Estatísticas de mensagens</li>
            <li>• Engajamento por grupo</li>
            <li>• Métricas de performance</li>
            <li>• Horários de pico</li>
            <li>• Taxa de entrega</li>
            <li>• Histórico completo</li>
          </ul>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">💡 Formatos</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>PDF:</strong> Visualização e impressão</li>
            <li>• <strong>CSV:</strong> Análise em planilhas</li>
            <li>• <strong>Excel:</strong> Dashboards avançados</li>
            <li>• <strong>JSON:</strong> Integração com APIs</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
