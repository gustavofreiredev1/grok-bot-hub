import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  MoreVertical,
  Clock,
  CheckCheck,
  Check,
  User,
  Tag,
  StickyNote,
  Zap,
  Archive,
  Filter,
  Plus,
  MessageSquare,
  X,
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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Contact {
  id: string;
  name: string | null;
  phone: string;
  avatar_url: string | null;
  tags: string[];
}

interface Conversation {
  id: string;
  contact_id: string;
  status: string;
  last_message_at: string;
  unread_count: number;
  tags: string[];
  contact: Contact;
}

interface Message {
  id: string;
  content: string | null;
  sender_type: string;
  message_type: string;
  status: string;
  created_at: string;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "read":
      return <CheckCheck className="h-3.5 w-3.5 text-primary" />;
    case "delivered":
      return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
    case "sent":
      return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
    default:
      return <Clock className="h-3.5 w-3.5 text-muted-foreground" />;
  }
};

const Inbox = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showContactPanel, setShowContactPanel] = useState(false);
  const [contactNote, setContactNote] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchConversations();
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);

      const channel = supabase
        .channel(`messages-${selectedConversation.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversation.id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("conversations")
      .select("*, contact:contacts(*)")
      .eq("user_id", user!.id)
      .order("last_message_at", { ascending: false });

    if (!error && data) {
      setConversations(data as any);
    }
    setLoading(false);
  };

  const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data);
    }

    // Mark as read
    await supabase
      .from("conversations")
      .update({ unread_count: 0 })
      .eq("id", conversationId);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    const { error } = await supabase.from("messages").insert({
      conversation_id: selectedConversation.id,
      user_id: user.id,
      content: newMessage.trim(),
      sender_type: "user",
      message_type: "text",
      status: "sent",
    });

    if (error) {
      toast.error("Erro ao enviar mensagem");
      return;
    }

    await supabase
      .from("conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", selectedConversation.id);

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      !searchQuery ||
      conv.contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.contact?.phone.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getContactName = (conv: Conversation) =>
    conv.contact?.name || conv.contact?.phone || "Desconhecido";

  const getInitials = (conv: Conversation) => {
    const name = conv.contact?.name;
    if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    return conv.contact?.phone?.slice(-2) || "??";
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex rounded-xl border border-border overflow-hidden bg-card">
      {/* Conversation List */}
      <div className="w-80 border-r border-border flex flex-col bg-card">
        {/* Search Header */}
        <div className="p-4 space-y-3 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Inbox</h2>
            <div className="flex gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>Todos</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("open")}>Abertos</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pendentes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("closed")}>Fechados</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-background"
            />
          </div>
          <div className="flex gap-1">
            {["all", "open", "pending", "closed"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs flex-1"
                onClick={() => setFilterStatus(status)}
              >
                {status === "all" ? "Todos" : status === "open" ? "Abertos" : status === "pending" ? "Pendentes" : "Fechados"}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          {loading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-12 w-12 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground text-center">
                Nenhuma conversa encontrada
              </p>
              <p className="text-xs text-muted-foreground/60 text-center mt-1">
                As conversas aparecerão aqui quando receber mensagens
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-border/50 transition-colors",
                  selectedConversation?.id === conv.id
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-accent/50"
                )}
              >
                <div className="relative">
                  <div className="h-11 w-11 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {getInitials(conv)}
                    </span>
                  </div>
                  {conv.status === "open" && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">
                      {getContactName(conv)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {format(new Date(conv.last_message_at), "HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground truncate">
                      {conv.contact?.phone}
                    </span>
                    {conv.unread_count > 0 && (
                      <Badge className="h-5 min-w-5 flex items-center justify-center bg-primary text-primary-foreground text-[10px] rounded-full px-1.5">
                        {conv.unread_count}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {getInitials(selectedConversation)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {getContactName(selectedConversation)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {selectedConversation.contact?.phone}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] h-4",
                        selectedConversation.status === "open" && "border-green-500/30 text-green-500",
                        selectedConversation.status === "pending" && "border-yellow-500/30 text-yellow-500",
                        selectedConversation.status === "closed" && "border-muted-foreground/30"
                      )}
                    >
                      {selectedConversation.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowContactPanel(!showContactPanel)}
                >
                  <User className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Tag className="h-4 w-4 mr-2" /> Adicionar Tag
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" /> Arquivar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Zap className="h-4 w-4 mr-2" /> Atribuir Fluxo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3 max-w-3xl mx-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <MessageSquare className="h-16 w-16 text-muted-foreground/20 mb-4" />
                    <p className="text-muted-foreground text-sm">Nenhuma mensagem ainda</p>
                    <p className="text-muted-foreground/60 text-xs mt-1">
                      Envie uma mensagem para iniciar a conversa
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender_type === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2.5 relative",
                          msg.sender_type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-1",
                            msg.sender_type === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <span
                            className={cn(
                              "text-[10px]",
                              msg.sender_type === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {format(new Date(msg.created_at), "HH:mm")}
                          </span>
                          {msg.sender_type === "user" && <StatusIcon status={msg.status} />}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <div className="flex items-end gap-2 max-w-3xl mx-auto">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="min-h-[40px] max-h-32 resize-none bg-background pr-10"
                    rows={1}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 bottom-1 h-8 w-8"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-10 w-10 text-primary/40" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Inbox</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Selecione uma conversa para começar ou aguarde novas mensagens
            </p>
          </div>
        )}
      </div>

      {/* Contact Info Panel */}
      {showContactPanel && selectedConversation && (
        <div className="w-72 border-l border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Detalhes do Contato</h3>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowContactPanel(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <span className="text-xl font-bold text-primary">
                    {getInitials(selectedConversation)}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground">
                  {getContactName(selectedConversation)}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.contact?.phone}
                </p>
              </div>

              <Separator />

              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Tag className="h-3 w-3" /> Tags
                </h5>
                <div className="flex flex-wrap gap-1">
                  {selectedConversation.contact?.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Tag
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <StickyNote className="h-3 w-3" /> Notas
                </h5>
                <Textarea
                  value={contactNote}
                  onChange={(e) => setContactNote(e.target.value)}
                  placeholder="Adicionar nota sobre este contato..."
                  className="text-xs min-h-[80px] bg-background"
                />
                <Button size="sm" className="mt-2 w-full h-7 text-xs">
                  Salvar Nota
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Inbox;
