import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bell, 
  Shield, 
  User, 
  CreditCard, 
  Crown,
  Check,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { subscription, currentPlan, isPro, cancelSubscription, reactivateSubscription, getLimits } = useSubscription();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [reactivating, setReactivating] = useState(false);
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [errorAlerts, setErrorAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCanceling(true);
    await cancelSubscription();
    setCanceling(false);
  };

  const handleReactivateSubscription = async () => {
    setReactivating(true);
    await reactivateSubscription();
    setReactivating(false);
  };

  const limits = getLimits();
  const isCanceled = subscription?.cancel_at_period_end;
  const periodEnd = subscription?.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString("pt-BR")
    : null;

  if (authLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-2 h-5 w-72" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-gradient-card border-border p-6">
              <Skeleton className="h-40 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie as preferências da sua conta e plataforma
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Perfil</h2>
              <p className="text-sm text-muted-foreground">Informações da sua conta</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
                className="bg-background border-border" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                disabled
                className="bg-muted border-border cursor-not-allowed" 
              />
              <p className="text-xs text-muted-foreground">
                O email não pode ser alterado
              </p>
            </div>
            <Button 
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </div>
        </Card>

        {/* Subscription Section */}
        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">Assinatura</h2>
                {isPro && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <Crown className="mr-1 h-3 w-3" />
                    PRO
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Gerencie seu plano e faturamento</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Current Plan */}
            <div className="rounded-lg border border-border bg-background/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground">
                    Plano {currentPlan?.name || "Starter"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isCanceled 
                      ? `Cancelado - Acesso até ${periodEnd}`
                      : `Renovação em ${periodEnd || "N/A"}`
                    }
                  </p>
                </div>
                {isCanceled ? (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Cancelado
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Ativo
                  </Badge>
                )}
              </div>
              
              <Separator className="my-3" />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {limits.maxBots === -1 ? "∞" : limits.maxBots}
                  </p>
                  <p className="text-xs text-muted-foreground">Bots</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {limits.maxFlows === -1 ? "∞" : limits.maxFlows}
                  </p>
                  <p className="text-xs text-muted-foreground">Fluxos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {limits.maxDailyMessages === -1 ? "∞" : limits.maxDailyMessages.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Msgs/dia</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/pricing")}
                className="flex-1"
              >
                {isPro ? "Alterar Plano" : "Fazer Upgrade"}
              </Button>
              
              {subscription && !isCanceled && (
                <Button 
                  variant="destructive"
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                  className="flex-1"
                >
                  {canceling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelando...
                    </>
                  ) : (
                    "Cancelar Assinatura"
                  )}
                </Button>
              )}
              
              {subscription && isCanceled && (
                <Button 
                  onClick={handleReactivateSubscription}
                  disabled={reactivating}
                  className="flex-1 bg-primary"
                >
                  {reactivating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reativando...
                    </>
                  ) : (
                    "Reativar Assinatura"
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Notifications Section */}
        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Notificações</h2>
              <p className="text-sm text-muted-foreground">Configure suas preferências de notificação</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações de Email</Label>
                <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Erro</Label>
                <p className="text-sm text-muted-foreground">Notificações quando um bot falha</p>
              </div>
              <Switch 
                checked={errorAlerts} 
                onCheckedChange={setErrorAlerts} 
              />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">Resumo semanal de atividades</p>
              </div>
              <Switch 
                checked={weeklyReports} 
                onCheckedChange={setWeeklyReports} 
              />
            </div>
          </div>
        </Card>

        {/* Security Section */}
        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Segurança</h2>
              <p className="text-sm text-muted-foreground">Configurações de segurança e privacidade</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
              </div>
              <Badge variant="secondary">Em breve</Badge>
            </div>
            <Separator className="bg-border" />
            <div className="grid gap-2">
              <Label>Alterar Senha</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Enviaremos um email com instruções para redefinir sua senha
              </p>
              <Button 
                variant="outline"
                onClick={async () => {
                  if (email) {
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/auth?mode=reset`,
                    });
                    if (error) {
                      toast.error("Erro ao enviar email de recuperação");
                    } else {
                      toast.success("Email de recuperação enviado!");
                    }
                  }
                }}
              >
                Enviar Email de Recuperação
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
