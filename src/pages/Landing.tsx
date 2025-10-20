import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">BotFlow</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#criar-bot" className="text-foreground hover:text-primary transition-colors">
              Criar Bot
            </a>
            <a href="#meus-bots" className="text-foreground hover:text-primary transition-colors">
              Meus Bots
            </a>
            <a href="#precos" className="text-foreground hover:text-primary transition-colors">
              Preços
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth">
              <Button>Cadastro</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            <span>Comece grátis com 5 créditos!</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Crie bots automáticos para WhatsApp{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              de forma simples e segura
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatize suas conversas no WhatsApp com nossa plataforma intuitiva. 
            Crie fluxos de mensagens, respostas automáticas e muito mais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-glow">
                Comece Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Por que escolher o BotFlow?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Fácil de Usar</h4>
              <p className="text-muted-foreground">
                Interface drag-and-drop intuitiva para criar fluxos de conversação sem precisar programar.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Seguro e Confiável</h4>
              <p className="text-muted-foreground">
                Seus dados e mensagens são criptografados e protegidos com os mais altos padrões de segurança.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Escalável</h4>
              <p className="text-muted-foreground">
                Comece pequeno e cresça conforme sua necessidade. Suporte para milhares de mensagens por dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Crie sua conta gratuitamente e comece a automatizar suas conversas hoje mesmo.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="shadow-lg">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 BotFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;