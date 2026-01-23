import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, Grid3X3, List, Zap } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { WhatsAppConfigPanel } from "@/components/WhatsAppConfigPanel";
import { tools } from "@/data/tools";
import { cn } from "@/lib/utils";

const Bots = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { id: null, label: "Todas", count: tools.length },
    { id: "automation", label: "Automação", count: tools.filter(t => t.category === "automation").length },
    { id: "extraction", label: "Extração", count: tools.filter(t => t.category === "extraction").length },
    { id: "validation", label: "Validação", count: tools.filter(t => t.category === "validation").length },
    { id: "messaging", label: "Mensagens", count: tools.filter(t => t.category === "messaging").length },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !activeCategory || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Ferramentas
              </h1>
              <p className="text-sm text-muted-foreground">
                {tools.length} ferramentas disponíveis para automação
              </p>
            </div>
          </div>
        </div>
        
        <WhatsAppConfigPanel
          trigger={
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow gap-2">
              <Settings className="h-4 w-4" />
              Configurar WhatsApp
            </Button>
          }
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id ?? "all"}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="gap-2"
          >
            {category.label}
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Search and View Toggle */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar ferramentas..."
            className="pl-10 bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div
        className={cn(
          "gap-6",
          viewMode === "grid"
            ? "grid md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col"
        )}
      >
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg font-medium text-foreground">Nenhuma ferramenta encontrada</p>
            <p className="text-sm text-muted-foreground">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </div>

      {/* Quick Setup Banner */}
      <div className="mt-8 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-lg">Configuração Rápida</h3>
            <p className="text-sm text-muted-foreground">
              Configure sua API do WhatsApp para habilitar todas as ferramentas automaticamente
            </p>
          </div>
          <WhatsAppConfigPanel
            trigger={
              <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
                <Settings className="h-4 w-4" />
                Configurar Agora
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Bots;
