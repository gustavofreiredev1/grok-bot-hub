import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bot, CheckCircle, MessageSquare, Zap, Users, Shield, 
  BarChart3, Clock, Star, ArrowRight, Menu, X 
} from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Bot,
      title: "Bots Inteligentes",
      description: "Crie e gerencie múltiplos bots automatizados para WhatsApp com IA integrada"
    },
    {
      icon: MessageSquare,
      title: "Mensagens em Massa",
      description: "Envie milhares de mensagens personalizadas com controle de taxa anti-ban"
    },
    {
      icon: Zap,
      title: "Automação Total",
      description: "Fluxos de conversa automáticos com respostas inteligentes em tempo real"
    },
    {
      icon: Users,
      title: "Gestão de Grupos",
      description: "Extraia, organize e gerencie membros de grupos em massa"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Relatórios detalhados com métricas de performance e engajamento"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Criptografia de ponta a ponta e proteção contra bloqueios"
    }
  ];

  const tools = [
    "Atendente IA ChatGPT",
    "WhatsFilter",
    "Exporter Group",
    "SDExporter",
    "Exporter Chat",
    "SDExporter UI",
    "WhatsAppOS"
  ];

  const pricing = [
    {
      name: "Starter",
      price: "Grátis",
      description: "Ideal para começar",
      features: [
        "Até 3 bots ativos",
        "100 mensagens/dia",
        "1 automação básica",
        "Suporte por email"
      ]
    },
    {
      name: "Professional",
      price: "R$ 97",
      period: "/mês",
      description: "Para profissionais",
      features: [
        "Bots ilimitados",
        "5.000 mensagens/dia",
        "Automações ilimitadas",
        "Todas as ferramentas",
        "Analytics avançado",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      description: "Para grandes volumes",
      features: [
        "Tudo do Professional",
        "Mensagens ilimitadas",
        "API dedicada",
        "Gerente de conta",
        "Onboarding personalizado",
        "SLA garantido"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">BotFlow</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
              <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors">Ferramentas</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a>
              <Button variant="ghost" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button onClick={() => navigate("/auth")} className="shadow-glow">
                Começar Grátis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#features" className="block py-2 text-muted-foreground hover:text-foreground">Recursos</a>
              <a href="#tools" className="block py-2 text-muted-foreground hover:text-foreground">Ferramentas</a>
              <a href="#pricing" className="block py-2 text-muted-foreground hover:text-foreground">Preços</a>
              <Button variant="outline" className="w-full" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button className="w-full shadow-glow" onClick={() => navigate("/auth")}>
                Começar Grátis
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Plataforma #1 de Automação para WhatsApp</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Automatize seu
            <span className="text-primary"> WhatsApp</span>
            <br />
            em Minutos
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie bots inteligentes, envie mensagens em massa, gerencie grupos e automatize 
            completamente sua comunicação no WhatsApp. Tudo em uma única plataforma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 shadow-glow"
              onClick={() => navigate("/auth")}
            >
              Começar Grátis - 5 Créditos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Demonstração
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Setup em 2 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-primary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para dominar a automação no WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 bg-card border-border hover:shadow-glow transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              7 Ferramentas Essenciais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Suite completa de ferramentas profissionais para WhatsApp
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {tools.map((tool, idx) => (
              <Card key={idx} className="p-4 bg-gradient-card border-border text-center hover:shadow-glow transition-all">
                <Bot className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">{tool}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/bots")} className="shadow-glow">
              Explorar Todas as Ferramentas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-primary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planos Transparentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Upgrade ou downgrade a qualquer momento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`p-8 bg-card border-border relative ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground mb-1">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate("/auth")}
                >
                  {plan.name === "Enterprise" ? "Falar com Vendas" : "Começar Agora"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="p-12 bg-gradient-card border-border text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pronto para Automatizar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já automatizaram sua comunicação no WhatsApp
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 shadow-glow"
              onClick={() => navigate("/auth")}
            >
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">BotFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma completa de automação para WhatsApp
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Recursos</a></li>
                <li><a href="#tools" className="hover:text-foreground">Ferramentas</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Preços</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Carreiras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground">Contato</a></li>
                <li><a href="#" className="hover:text-foreground">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 BotFlow. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacidade</a>
              <a href="#" className="hover:text-foreground">Termos</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;