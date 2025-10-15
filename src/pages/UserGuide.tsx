import { Book, Bot, Send, Upload, Calendar, BarChart3, Settings, Zap, MessageSquare, Users, Shield, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function UserGuide() {
  const sections = [
    {
      id: "intro",
      title: "Introdução ao BotFlow",
      icon: Book,
      color: "bg-primary/10 text-primary",
      content: [
        {
          subtitle: "O que é o BotFlow?",
          text: "BotFlow é uma plataforma completa de automação para WhatsApp que permite gerenciar múltiplos bots, enviar mensagens em massa, agendar campanhas e analisar resultados em tempo real.",
        },
        {
          subtitle: "Principais Benefícios",
          text: "• Automação completa de comunicação\n• Gestão centralizada de múltiplos bots\n• Interface intuitiva e moderna\n• Análises detalhadas de performance\n• Segurança e confiabilidade",
        },
      ],
    },
    {
      id: "bots",
      title: "Gerenciamento de Bots",
      icon: Bot,
      color: "bg-blue-500/10 text-blue-500",
      content: [
        {
          subtitle: "Criando um Bot",
          text: "1. Acesse a página 'Bots'\n2. Clique em 'Adicionar Bot'\n3. Configure nome, tipo e grupos\n4. Ative o bot para iniciar",
        },
        {
          subtitle: "Tipos de Bots",
          text: "• Bot de Vendas: Automatiza atendimento comercial\n• Bot de Suporte: Responde dúvidas frequentes\n• Bot de Marketing: Envia campanhas promocionais\n• Bot Custom: Personalize completamente",
        },
        {
          subtitle: "Monitoramento",
          text: "Acompanhe em tempo real o status, mensagens enviadas e grupos conectados de cada bot no dashboard principal.",
        },
      ],
    },
    {
      id: "messages",
      title: "Envio de Mensagens",
      icon: Send,
      color: "bg-green-500/10 text-green-500",
      content: [
        {
          subtitle: "Envio Instantâneo",
          text: "1. Acesse 'Enviar Mensagens'\n2. Selecione os grupos destinatários\n3. Digite sua mensagem\n4. Clique em 'Enviar Agora'",
        },
        {
          subtitle: "Templates",
          text: "Use templates prontos para agilizar envios recorrentes como boas-vindas, promoções e lembretes. Você também pode criar templates personalizados.",
        },
        {
          subtitle: "Variáveis Dinâmicas",
          text: "Personalize mensagens usando:\n• {{nome}} - Nome do contato\n• {{grupo}} - Nome do grupo\n• {{data}} - Data atual\n• {{hora}} - Hora atual",
        },
      ],
    },
    {
      id: "files",
      title: "Upload de Arquivos",
      icon: Upload,
      color: "bg-purple-500/10 text-purple-500",
      content: [
        {
          subtitle: "Arrastar e Soltar",
          text: "Arraste arquivos diretamente para a área de upload ou clique para selecionar. Suporta múltiplos arquivos simultaneamente.",
        },
        {
          subtitle: "Formatos Suportados",
          text: "• Imagens: JPG, PNG, GIF, WEBP\n• Vídeos: MP4, AVI, MOV\n• Documentos: PDF, DOC, DOCX, XLS\n• Limite: 50MB por arquivo",
        },
        {
          subtitle: "Legendas e Destinos",
          text: "Adicione legendas opcionais e escolha para quais grupos enviar cada arquivo. O sistema comprime automaticamente para otimizar o envio.",
        },
      ],
    },
    {
      id: "schedule",
      title: "Agendamento",
      icon: Calendar,
      color: "bg-orange-500/10 text-orange-500",
      content: [
        {
          subtitle: "Criar Agendamento",
          text: "1. Na página de mensagens, escolha 'Agendado'\n2. Defina data e horário\n3. Configure grupos e mensagem\n4. Salve o agendamento",
        },
        {
          subtitle: "Gerenciar Agendamentos",
          text: "Acesse 'Agendamentos' para visualizar, editar ou cancelar mensagens agendadas. O sistema envia automaticamente no horário configurado.",
        },
        {
          subtitle: "Melhores Práticas",
          text: "• Agende com antecedência\n• Use horários de maior engajamento\n• Evite madrugadas e feriados\n• Revise antes de agendar",
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics e Relatórios",
      icon: BarChart3,
      color: "bg-cyan-500/10 text-cyan-500",
      content: [
        {
          subtitle: "Dashboard de Analytics",
          text: "Visualize métricas em tempo real: mensagens enviadas, taxa de entrega, engajamento por grupo, horários de pico e muito mais.",
        },
        {
          subtitle: "Exportar Relatórios",
          text: "Exporte dados em PDF, CSV ou Excel. Escolha o período desejado e o tipo de relatório (mensagens, grupos, performance).",
        },
        {
          subtitle: "Insights Automáticos",
          text: "O sistema gera insights automáticos sobre tendências, melhores horários de envio e grupos mais engajados.",
        },
      ],
    },
    {
      id: "automation",
      title: "Automação Avançada",
      icon: Zap,
      color: "bg-yellow-500/10 text-yellow-500",
      content: [
        {
          subtitle: "Respostas Automáticas",
          text: "Configure palavras-chave e respostas automáticas. Ex: Quando alguém enviar 'horário', o bot responde automaticamente com o horário de funcionamento.",
        },
        {
          subtitle: "Fluxos de Conversa",
          text: "Crie fluxos de conversa complexos com múltiplos níveis de interação, como menus de opções e coleta de dados.",
        },
        {
          subtitle: "Filtros Inteligentes",
          text: "Filtre mensagens por conteúdo, remetente ou grupo. Configure ações automáticas como arquivar, responder ou encaminhar.",
        },
      ],
    },
    {
      id: "security",
      title: "Segurança",
      icon: Shield,
      color: "bg-red-500/10 text-red-500",
      content: [
        {
          subtitle: "Autenticação Segura",
          text: "O BotFlow usa autenticação de dois fatores (2FA) para máxima segurança. Ative nas configurações para proteger sua conta.",
        },
        {
          subtitle: "Permissões",
          text: "Gerencie permissões de usuários:\n• Admin: Acesso total\n• Bot Manager: Gerencia bots e envios\n• Viewer: Apenas visualização",
        },
        {
          subtitle: "Logs de Auditoria",
          text: "Todas as ações são registradas em logs detalhados. Monitore quem fez o quê e quando nas configurações de segurança.",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "Quantos bots posso criar?",
      answer: "O número de bots depende do seu plano. No plano básico, até 3 bots. No plano profissional, bots ilimitados.",
    },
    {
      question: "Como adiciono grupos ao bot?",
      answer: "Acesse a página do bot, clique em 'Adicionar Grupos' e use a busca para encontrar e adicionar grupos do WhatsApp.",
    },
    {
      question: "Posso agendar mensagens recorrentes?",
      answer: "Sim! Use a função de agendamento recorrente para enviar mensagens diárias, semanais ou mensais automaticamente.",
    },
    {
      question: "Os dados são seguros?",
      answer: "Absolutamente. Usamos criptografia de ponta a ponta e servidores seguros. Seus dados nunca são compartilhados com terceiros.",
    },
    {
      question: "Como cancelo um agendamento?",
      answer: "Acesse 'Agendamentos', encontre a mensagem agendada e clique no ícone de lixeira. Cancelamentos são instantâneos.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Manual do Usuário</h1>
        <p className="text-muted-foreground">Guia completo para aproveitar ao máximo o BotFlow</p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-primary border-border">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Início Rápido</h2>
            <p className="text-muted-foreground mb-3">
              Novo no BotFlow? Siga estes passos para começar em minutos:
            </p>
            <ol className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <Badge variant="secondary">1</Badge>
                Configure seu primeiro bot na página <strong>Bots</strong>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">2</Badge>
                Adicione grupos ao bot e ative-o
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">3</Badge>
                Teste enviando uma mensagem via <strong>Enviar Mensagens</strong>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">4</Badge>
                Configure automações em <strong>Automação</strong>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">5</Badge>
                Monitore resultados em <strong>Analytics</strong>
              </li>
            </ol>
          </div>
        </div>
      </Card>

      {/* Guide Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.id} className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${section.color}`}>
                <section.icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {section.content.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {item.subtitle}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.text}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Support */}
      <Card className="p-6 bg-gradient-primary border-border">
        <div className="text-center">
          <Users className="h-12 w-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Precisa de Ajuda?</h2>
          <p className="text-muted-foreground mb-4">
            Nossa equipe está pronta para ajudar você
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              📧 suporte@botflow.com
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              💬 Chat ao vivo 24/7
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              📱 WhatsApp: (11) 99999-9999
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
