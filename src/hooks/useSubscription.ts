import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useSubscription() {
  const { subscription, refreshSubscription, user } = useAuth();

  const currentPlan = subscription?.plan;
  const isPro = currentPlan?.slug === "professional" || currentPlan?.slug === "enterprise";
  const isEnterprise = currentPlan?.slug === "enterprise";

  const canCreateBot = () => {
    if (!currentPlan) return false;
    if (currentPlan.max_bots === -1) return true; // Unlimited
    // Would need to count current bots
    return true;
  };

  const canCreateFlow = () => {
    if (!currentPlan) return false;
    if (currentPlan.max_flows === -1) return true; // Unlimited
    // Would need to count current flows
    return true;
  };

  const canSendMessage = () => {
    if (!currentPlan) return false;
    if (currentPlan.max_daily_messages === -1) return true; // Unlimited
    // Would need to check daily count
    return true;
  };

  const getLimits = () => {
    if (!currentPlan) {
      return {
        maxBots: 3,
        maxFlows: 5,
        maxDailyMessages: 100,
      };
    }

    return {
      maxBots: currentPlan.max_bots,
      maxFlows: currentPlan.max_flows,
      maxDailyMessages: currentPlan.max_daily_messages,
    };
  };

  const cancelSubscription = async () => {
    if (!subscription?.id) return { error: new Error("No subscription found") };

    try {
      const { error } = await supabase
        .from("subscriptions")
        .update({
          cancel_at_period_end: true,
          canceled_at: new Date().toISOString(),
        })
        .eq("id", subscription.id);

      if (error) throw error;

      await refreshSubscription();
      toast.success("Assinatura cancelada. Acesso permanece até o fim do período.");
      return { error: null };
    } catch (error) {
      console.error("Cancel subscription error:", error);
      toast.error("Erro ao cancelar assinatura");
      return { error: error as Error };
    }
  };

  const reactivateSubscription = async () => {
    if (!subscription?.id) return { error: new Error("No subscription found") };

    try {
      const { error } = await supabase
        .from("subscriptions")
        .update({
          cancel_at_period_end: false,
          canceled_at: null,
        })
        .eq("id", subscription.id);

      if (error) throw error;

      await refreshSubscription();
      toast.success("Assinatura reativada com sucesso!");
      return { error: null };
    } catch (error) {
      console.error("Reactivate subscription error:", error);
      toast.error("Erro ao reativar assinatura");
      return { error: error as Error };
    }
  };

  return {
    subscription,
    currentPlan,
    isPro,
    isEnterprise,
    canCreateBot,
    canCreateFlow,
    canSendMessage,
    getLimits,
    cancelSubscription,
    reactivateSubscription,
  };
}
