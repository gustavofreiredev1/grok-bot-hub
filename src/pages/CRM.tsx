import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  DollarSign,
  MoreVertical,
  Trash2,
  GripVertical,
  User,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  position: number;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  currency: string;
  stage_id: string;
  contact_id: string | null;
  notes: string | null;
  position: number;
  created_at: string;
}

const defaultStages = [
  { name: "Lead", color: "#6366f1", position: 0 },
  { name: "Qualificado", color: "#f59e0b", position: 1 },
  { name: "Proposta", color: "#3b82f6", position: 2 },
  { name: "Negociação", color: "#8b5cf6", position: 3 },
  { name: "Fechado", color: "#22c55e", position: 4 },
];

const CRM = () => {
  const { user } = useAuth();
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDealOpen, setIsCreateDealOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const [newDeal, setNewDeal] = useState({ title: "", value: "", notes: "" });
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    if (user) initializePipeline();
  }, [user]);

  const initializePipeline = async () => {
    setLoading(true);
    const { data: existingStages } = await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("user_id", user!.id)
      .order("position");

    if (existingStages && existingStages.length > 0) {
      setStages(existingStages);
    } else {
      // Create default stages
      const { data: newStages, error } = await supabase
        .from("pipeline_stages")
        .insert(defaultStages.map((s) => ({ ...s, user_id: user!.id })))
        .select();

      if (!error && newStages) {
        setStages(newStages);
      }
    }

    const { data: dealsData } = await supabase
      .from("deals")
      .select("*")
      .eq("user_id", user!.id)
      .order("position");

    if (dealsData) setDeals(dealsData);
    setLoading(false);
  };

  const createDeal = async () => {
    if (!newDeal.title || !user || !selectedStageId) {
      toast.error("Título é obrigatório");
      return;
    }

    const { error } = await supabase.from("deals").insert({
      user_id: user.id,
      title: newDeal.title,
      value: parseFloat(newDeal.value) || 0,
      notes: newDeal.notes || null,
      stage_id: selectedStageId,
      position: deals.filter((d) => d.stage_id === selectedStageId).length,
    });

    if (!error) {
      toast.success("Negócio criado!");
      setIsCreateDealOpen(false);
      setNewDeal({ title: "", value: "", notes: "" });
      initializePipeline();
    }
  };

  const deleteDeal = async (id: string) => {
    await supabase.from("deals").delete().eq("id", id);
    toast.success("Negócio excluído");
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  const moveDeal = async (dealId: string, newStageId: string) => {
    const { error } = await supabase
      .from("deals")
      .update({ stage_id: newStageId })
      .eq("id", dealId);

    if (!error) {
      setDeals((prev) =>
        prev.map((d) => (d.id === dealId ? { ...d, stage_id: newStageId } : d))
      );
    }
  };

  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stageId: string) => {
    if (draggedDeal && draggedDeal.stage_id !== stageId) {
      moveDeal(draggedDeal.id, stageId);
    }
    setDraggedDeal(null);
  };

  const getStageDeals = (stageId: string) =>
    deals.filter((d) => d.stage_id === stageId);

  const getStageTotalValue = (stageId: string) =>
    getStageDeals(stageId).reduce((sum, d) => sum + (d.value || 0), 0);

  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CRM</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seu pipeline de vendas
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{deals.length}</p>
              <p className="text-xs text-muted-foreground">Total Negócios</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalValue)}</p>
              <p className="text-xs text-muted-foreground">Valor Total</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {getStageDeals(stages[stages.length - 1]?.id || "").length}
              </p>
              <p className="text-xs text-muted-foreground">Fechados</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {deals.length > 0
                  ? `${Math.round((getStageDeals(stages[stages.length - 1]?.id || "").length / deals.length) * 100)}%`
                  : "0%"}
              </p>
              <p className="text-xs text-muted-foreground">Taxa Conversão</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="min-w-[280px] bg-muted/30 rounded-xl p-4 animate-pulse">
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="space-y-3">
                  <div className="h-24 bg-muted rounded" />
                  <div className="h-24 bg-muted rounded" />
                </div>
              </div>
            ))
          : stages.map((stage) => (
              <div
                key={stage.id}
                className="min-w-[280px] w-[280px] bg-muted/20 rounded-xl flex flex-col"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                {/* Stage Header */}
                <div className="p-3 border-b border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <h3 className="text-sm font-semibold text-foreground">{stage.name}</h3>
                      <Badge variant="secondary" className="text-xs h-5">
                        {getStageDeals(stage.id).length}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setSelectedStageId(stage.id);
                        setIsCreateDealOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(getStageTotalValue(stage.id))}
                  </p>
                </div>

                {/* Deals */}
                <ScrollArea className="flex-1 p-2">
                  <div className="space-y-2">
                    {getStageDeals(stage.id).map((deal) => (
                      <Card
                        key={deal.id}
                        draggable
                        onDragStart={() => handleDragStart(deal)}
                        className={cn(
                          "p-3 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all",
                          draggedDeal?.id === deal.id && "opacity-50"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{deal.title}</p>
                              {deal.value > 0 && (
                                <p className="text-xs font-semibold text-green-500 mt-0.5">
                                  {formatCurrency(deal.value)}
                                </p>
                              )}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {stages
                                .filter((s) => s.id !== stage.id)
                                .map((s) => (
                                  <DropdownMenuItem
                                    key={s.id}
                                    onClick={() => moveDeal(deal.id, s.id)}
                                  >
                                    Mover para {s.name}
                                  </DropdownMenuItem>
                                ))}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => deleteDeal(deal.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        {deal.notes && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {deal.notes}
                          </p>
                        )}
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ))}
      </div>

      {/* Create Deal Dialog */}
      <Dialog open={isCreateDealOpen} onOpenChange={setIsCreateDealOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Negócio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Título *</Label>
              <Input
                value={newDeal.title}
                onChange={(e) => setNewDeal((p) => ({ ...p, title: e.target.value }))}
                placeholder="Nome do negócio"
              />
            </div>
            <div>
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                value={newDeal.value}
                onChange={(e) => setNewDeal((p) => ({ ...p, value: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Notas</Label>
              <Textarea
                value={newDeal.notes}
                onChange={(e) => setNewDeal((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Observações..."
              />
            </div>
            <Button className="w-full" onClick={createDeal}>
              Criar Negócio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRM;
