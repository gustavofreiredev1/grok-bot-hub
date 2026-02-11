import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Send,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Megaphone,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  message_content: string;
  message_type: string;
  target_tags: string[];
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  total_recipients: number;
  sent_count: number;
  delivered_count: number;
  read_count: number;
  failed_count: number;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Rascunho", color: "text-muted-foreground", icon: Clock },
  scheduled: { label: "Agendada", color: "text-blue-500", icon: Clock },
  sending: { label: "Enviando", color: "text-yellow-500", icon: Send },
  sent: { label: "Enviada", color: "text-green-500", icon: CheckCircle },
  cancelled: { label: "Cancelada", color: "text-destructive", icon: XCircle },
};

const Campaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [contactTags, setContactTags] = useState<string[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    message_content: "",
    target_tags: [] as string[],
    message_type: "text",
  });

  useEffect(() => {
    if (user) {
      fetchCampaigns();
      fetchContactTags();
    }
  }, [user]);

  const fetchCampaigns = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (data) setCampaigns(data as any);
    setLoading(false);
  };

  const fetchContactTags = async () => {
    const { data } = await supabase
      .from("contacts")
      .select("tags")
      .eq("user_id", user!.id);

    if (data) {
      const allTags = [...new Set(data.flatMap((c: any) => c.tags || []))];
      setContactTags(allTags);
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.name || !newCampaign.message_content || !user) {
      toast.error("Nome e mensagem são obrigatórios");
      return;
    }

    // Count recipients
    let recipientCount = 0;
    if (newCampaign.target_tags.length > 0) {
      const { count } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .overlaps("tags", newCampaign.target_tags);
      recipientCount = count || 0;
    } else {
      const { count } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      recipientCount = count || 0;
    }

    const { error } = await supabase.from("campaigns").insert({
      user_id: user.id,
      name: newCampaign.name,
      message_content: newCampaign.message_content,
      message_type: newCampaign.message_type,
      target_tags: newCampaign.target_tags,
      total_recipients: recipientCount,
      status: "draft",
    });

    if (!error) {
      toast.success("Campanha criada!");
      setIsCreateOpen(false);
      setNewCampaign({ name: "", message_content: "", target_tags: [], message_type: "text" });
      fetchCampaigns();
    }
  };

  const deleteCampaign = async (id: string) => {
    await supabase.from("campaigns").delete().eq("id", id);
    toast.success("Campanha excluída");
    fetchCampaigns();
  };

  const sendCampaign = async (id: string) => {
    await supabase
      .from("campaigns")
      .update({ status: "sending", sent_at: new Date().toISOString() })
      .eq("id", id);
    toast.success("Campanha iniciada!");
    fetchCampaigns();
  };

  const totalSent = campaigns.reduce((sum, c) => sum + c.sent_count, 0);
  const totalDelivered = campaigns.reduce((sum, c) => sum + c.delivered_count, 0);
  const totalRead = campaigns.reduce((sum, c) => sum + c.read_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campanhas</h1>
          <p className="text-sm text-muted-foreground">
            Crie e gerencie broadcasts segmentados
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova Campanha</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome da Campanha *</Label>
                <Input
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: Promoção Black Friday"
                />
              </div>
              <div>
                <Label>Tipo de Mensagem</Label>
                <Select
                  value={newCampaign.message_type}
                  onValueChange={(v) => setNewCampaign((p) => ({ ...p, message_type: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="image">Imagem + Texto</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mensagem *</Label>
                <Textarea
                  value={newCampaign.message_content}
                  onChange={(e) =>
                    setNewCampaign((p) => ({ ...p, message_content: e.target.value }))
                  }
                  placeholder="Digite a mensagem da campanha..."
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use {"{{nome}}"} para personalizar com o nome do contato
                </p>
              </div>
              <div>
                <Label>Segmentar por Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {contactTags.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Nenhuma tag encontrada. Todos os contatos receberão.
                    </p>
                  ) : (
                    contactTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={
                          newCampaign.target_tags.includes(tag) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setNewCampaign((p) => ({
                            ...p,
                            target_tags: p.target_tags.includes(tag)
                              ? p.target_tags.filter((t) => t !== tag)
                              : [...p.target_tags, tag],
                          }))
                        }
                      >
                        {tag}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
              <Button className="w-full" onClick={createCampaign}>
                Criar Campanha
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{campaigns.length}</p>
              <p className="text-xs text-muted-foreground">Campanhas</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalSent}</p>
              <p className="text-xs text-muted-foreground">Mensagens Enviadas</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalDelivered}</p>
              <p className="text-xs text-muted-foreground">Entregues</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalRead}</p>
              <p className="text-xs text-muted-foreground">Lidas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campanha</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destinatários</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-4 bg-muted rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <Megaphone className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-muted-foreground">Nenhuma campanha criada</p>
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((campaign) => {
                const config = statusConfig[campaign.status] || statusConfig.draft;
                const StatusIcon = config.icon;
                const progress =
                  campaign.total_recipients > 0
                    ? Math.round((campaign.sent_count / campaign.total_recipients) * 100)
                    : 0;

                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {campaign.message_content}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("gap-1", config.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{campaign.total_recipients}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {campaign.sent_count}/{campaign.total_recipients} ({progress}%)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(campaign.created_at), "dd/MM/yy HH:mm", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {campaign.status === "draft" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => sendCampaign(campaign.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => deleteCampaign(campaign.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Campaigns;
