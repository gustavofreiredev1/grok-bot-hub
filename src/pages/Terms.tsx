import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">BotFlow</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Card className="p-8 md:p-12 bg-card border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Termos de Serviço
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização: Janeiro de 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Aceitação dos Termos
              </h2>
              <p className="text-muted-foreground">
                Ao acessar e usar o BotFlow, você concorda com estes Termos de Serviço. 
                Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Descrição do Serviço
              </h2>
              <p className="text-muted-foreground">
                O BotFlow é uma plataforma de automação para WhatsApp que permite criar, 
                gerenciar e executar bots automatizados para comunicação empresarial. 
                O serviço inclui:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Criação e gestão de bots automatizados</li>
                <li>Envio de mensagens em massa</li>
                <li>Fluxos de automação personalizados</li>
                <li>Analytics e relatórios</li>
                <li>Integrações com APIs externas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Contas de Usuário
              </h2>
              <p className="text-muted-foreground">
                Para usar o BotFlow, você deve criar uma conta fornecendo informações 
                precisas e atualizadas. Você é responsável por:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Manter a confidencialidade de sua senha</li>
                <li>Todas as atividades que ocorrem em sua conta</li>
                <li>Notificar-nos imediatamente sobre uso não autorizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Uso Aceitável
              </h2>
              <p className="text-muted-foreground">
                Você concorda em não usar o BotFlow para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Enviar spam ou mensagens não solicitadas</li>
                <li>Violar leis ou regulamentações aplicáveis</li>
                <li>Infringir direitos de propriedade intelectual</li>
                <li>Distribuir malware ou conteúdo malicioso</li>
                <li>Assediar, ameaçar ou prejudicar outros usuários</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Pagamentos e Assinaturas
              </h2>
              <p className="text-muted-foreground">
                Alguns recursos do BotFlow requerem uma assinatura paga. 
                Ao assinar um plano pago, você concorda com:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Cobrança automática no período de renovação</li>
                <li>Não há reembolso por períodos parciais</li>
                <li>Alterações de preço serão notificadas com 30 dias de antecedência</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Propriedade Intelectual
              </h2>
              <p className="text-muted-foreground">
                O BotFlow e todo o seu conteúdo, recursos e funcionalidades são de 
                propriedade exclusiva da empresa e estão protegidos por leis de direitos autorais, 
                marcas registradas e outras leis de propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Limitação de Responsabilidade
              </h2>
              <p className="text-muted-foreground">
                O BotFlow é fornecido "como está", sem garantias de qualquer tipo. 
                Não nos responsabilizamos por danos diretos, indiretos, incidentais 
                ou consequenciais resultantes do uso do serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Modificações dos Termos
              </h2>
              <p className="text-muted-foreground">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão notificadas por email ou através do serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Contato
              </h2>
              <p className="text-muted-foreground">
                Para dúvidas sobre estes Termos de Serviço, entre em contato através do 
                email: suporte@botflow.com.br
              </p>
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Terms;
