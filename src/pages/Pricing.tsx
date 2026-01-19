import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bot, CheckCircle, ArrowLeft, Loader2, Crown, Zap, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  max_bots: number;
  max_daily_messages: number;
  max_flows: number;
  features: string[];
}

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentPlan } = useSubscription();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("is_active", true)
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      
      // Parse features from JSONB
      const parsedPlans = (data || []).map(plan => ({
        ...plan,
        features: typeof plan.features === 'string' 
          ? JSON.parse(plan.features) 
          : plan.features || []
      }));
      
      setPlans(parsedPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Erro ao carregar planos");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = async (plan: Plan) => {
    if (!user) {
      navigate("/auth?mode=signup");
      return;
    }

    if (plan.slug === currentPlan?.slug) {
      toast.info("Você já possui este plano");
      return;
    }

    if (plan.slug === "starter") {
      toast.info("Para fazer downgrade para o plano gratuito, cancele sua assinatura atual");
      return;
    }

    if (plan.slug === "enterprise") {
      toast.info("Entre em contato conosco para o plano Enterprise");
      // Could redirect to a contact form
      return;
    }

    setProcessingPlan(plan.id);
    
    // For now, simulate a checkout process
    // In production, this would integrate with Stripe
    toast.info("Redirecionando para o checkout...");
    
    setTimeout(() => {
      setProcessingPlan(null);
      toast.success("Funcionalidade de pagamento em breve!");
    }, 2000);
  };

  const getPlanIcon = (slug: string) => {
    switch (slug) {
      case "enterprise":
        return <Crown className="h-6 w-6" />;
      case "professional":
        return <Zap className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
            {user ? (
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")}>
                Entrar
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planos e Preços
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Escolha o plano ideal para o seu negócio. Upgrade ou downgrade a qualquer momento.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="billing-toggle" className={!isYearly ? "text-foreground" : "text-muted-foreground"}>
              Mensal
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={isYearly ? "text-foreground" : "text-muted-foreground"}>
              Anual
              <Badge variant="secondary" className="ml-2">-17%</Badge>
            </Label>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = isYearly ? plan.price_yearly / 12 : plan.price_monthly;
            const isCurrentPlan = currentPlan?.slug === plan.slug;
            const isPopular = plan.slug === "professional";

            return (
              <Card 
                key={plan.id}
                className={`p-8 bg-card border-border relative ${
                  isPopular ? "ring-2 ring-primary shadow-glow" : ""
                } ${isCurrentPlan ? "ring-2 ring-primary/50" : ""}`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <Badge variant="outline" className="border-primary text-primary">
                      Plano Atual
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    plan.slug === "enterprise" ? "bg-yellow-500/10 text-yellow-500" :
                    plan.slug === "professional" ? "bg-primary/10 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {getPlanIcon(plan.slug)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  {plan.price_monthly === 0 ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-foreground">Grátis</span>
                    </div>
                  ) : plan.slug === "enterprise" ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-foreground">Personalizado</span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        R$ {price.toFixed(0)}
                      </span>
                      <span className="text-muted-foreground mb-1">/mês</span>
                    </div>
                  )}
                  {isYearly && plan.price_monthly > 0 && plan.slug !== "enterprise" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      R$ {plan.price_yearly.toFixed(0)}/ano (economia de R$ {(plan.price_monthly * 12 - plan.price_yearly).toFixed(0)})
                    </p>
                  )}
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
                  variant={isPopular ? "default" : "outline"}
                  disabled={isCurrentPlan || processingPlan === plan.id}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {processingPlan === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : isCurrentPlan ? (
                    "Plano Atual"
                  ) : plan.slug === "enterprise" ? (
                    "Falar com Vendas"
                  ) : plan.slug === "starter" ? (
                    "Começar Grátis"
                  ) : (
                    "Assinar Agora"
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-muted-foreground">
                Sim! Você pode cancelar sua assinatura a qualquer momento. O acesso continua até o fim do período pago.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Como funciona o período de teste?
              </h3>
              <p className="text-muted-foreground">
                O plano Starter é gratuito para sempre! Você pode testar todas as funcionalidades básicas sem precisar de cartão de crédito.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Quais formas de pagamento são aceitas?
              </h3>
              <p className="text-muted-foreground">
                Aceitamos cartão de crédito, débito e PIX. Todos os pagamentos são processados de forma segura.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
