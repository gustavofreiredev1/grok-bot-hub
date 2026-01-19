import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, ArrowLeft } from "lucide-react";

const Privacy = () => {
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
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização: Janeiro de 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introdução
              </h2>
              <p className="text-muted-foreground">
                O BotFlow está comprometido em proteger sua privacidade. Esta Política de 
                Privacidade explica como coletamos, usamos, divulgamos e protegemos suas 
                informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Dados que Coletamos
              </h2>
              <p className="text-muted-foreground">
                Coletamos os seguintes tipos de informações:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li><strong>Dados de cadastro:</strong> nome, email, senha (criptografada)</li>
                <li><strong>Dados de uso:</strong> logs de atividade, preferências, configurações</li>
                <li><strong>Dados de pagamento:</strong> informações de cobrança processadas por terceiros</li>
                <li><strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo, navegador</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Como Usamos seus Dados
              </h2>
              <p className="text-muted-foreground">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Fornecer e manter nosso serviço</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Enviar notificações importantes sobre o serviço</li>
                <li>Melhorar e personalizar sua experiência</li>
                <li>Proteger contra fraudes e uso indevido</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Base Legal para Processamento (LGPD)
              </h2>
              <p className="text-muted-foreground">
                Processamos seus dados com base nas seguintes bases legais:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li><strong>Execução de contrato:</strong> para fornecer nossos serviços</li>
                <li><strong>Consentimento:</strong> para comunicações de marketing</li>
                <li><strong>Interesses legítimos:</strong> para melhorar nossos serviços</li>
                <li><strong>Obrigação legal:</strong> para cumprir leis aplicáveis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Compartilhamento de Dados
              </h2>
              <p className="text-muted-foreground">
                Não vendemos suas informações pessoais. Podemos compartilhar dados com:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Provedores de serviços que nos auxiliam (pagamentos, hospedagem)</li>
                <li>Autoridades legais quando exigido por lei</li>
                <li>Parceiros de negócios com seu consentimento explícito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Seus Direitos (LGPD)
              </h2>
              <p className="text-muted-foreground">
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li><strong>Confirmação:</strong> saber se tratamos seus dados</li>
                <li><strong>Acesso:</strong> obter cópia dos dados que temos sobre você</li>
                <li><strong>Correção:</strong> corrigir dados incompletos ou incorretos</li>
                <li><strong>Anonimização/Bloqueio:</strong> solicitar anonimização de dados desnecessários</li>
                <li><strong>Eliminação:</strong> solicitar exclusão de dados pessoais</li>
                <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
                <li><strong>Revogação:</strong> retirar consentimento a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Segurança dos Dados
              </h2>
              <p className="text-muted-foreground">
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                suas informações, incluindo:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e seguros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Retenção de Dados
              </h2>
              <p className="text-muted-foreground">
                Mantemos seus dados pelo tempo necessário para fornecer nossos serviços 
                e cumprir obrigações legais. Após o encerramento da conta, os dados serão 
                excluídos dentro de 90 dias, exceto quando a retenção for legalmente exigida.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Cookies e Tecnologias Similares
              </h2>
              <p className="text-muted-foreground">
                Utilizamos cookies para melhorar sua experiência. Você pode gerenciar 
                preferências de cookies através das configurações do navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Contato e Encarregado de Dados
              </h2>
              <p className="text-muted-foreground">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                entre em contato:
              </p>
              <ul className="list-none text-muted-foreground mt-2 space-y-1">
                <li>Email: privacidade@botflow.com.br</li>
                <li>Encarregado de Proteção de Dados (DPO): dpo@botflow.com.br</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Alterações nesta Política
              </h2>
              <p className="text-muted-foreground">
                Podemos atualizar esta política periodicamente. Alterações significativas 
                serão comunicadas por email ou através do serviço com pelo menos 30 dias 
                de antecedência.
              </p>
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Privacy;
