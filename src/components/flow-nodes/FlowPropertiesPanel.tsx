import { Node } from "reactflow";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface FlowPropertiesPanelProps {
  selectedNode: Node | null;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

export const FlowPropertiesPanel = ({ 
  selectedNode, 
  onClose, 
  onUpdate 
}: FlowPropertiesPanelProps) => {
  if (!selectedNode) return null;

  const handleChange = (field: string, value: any) => {
    onUpdate({ ...selectedNode.data, [field]: value });
  };

  const renderFields = () => {
    switch (selectedNode.type) {
      case "message":
        return (
          <div className="space-y-4">
            <div>
              <Label>Mensagem</Label>
              <Textarea
                value={selectedNode.data.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>
          </div>
        );
      
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label>Texto da Mensagem</Label>
              <Textarea
                value={selectedNode.data.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>
            <Separator />
            <div>
              <Label>Botões (um por linha)</Label>
              <Textarea
                value={selectedNode.data.buttons?.join("\n") || ""}
                onChange={(e) => handleChange("buttons", e.target.value.split("\n"))}
                rows={5}
                className="mt-2"
                placeholder="Botão 1&#10;Botão 2&#10;Botão 3"
              />
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="space-y-4">
            <div>
              <Label>URL do Áudio</Label>
              <Input
                value={selectedNode.data.audioUrl || ""}
                onChange={(e) => handleChange("audioUrl", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={selectedNode.data.imageUrl || ""}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Legenda</Label>
              <Input
                value={selectedNode.data.caption || ""}
                onChange={(e) => handleChange("caption", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <div>
              <Label>URL do Vídeo</Label>
              <Input
                value={selectedNode.data.videoUrl || ""}
                onChange={(e) => handleChange("videoUrl", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Legenda</Label>
              <Input
                value={selectedNode.data.caption || ""}
                onChange={(e) => handleChange("caption", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case "delay":
        return (
          <div className="space-y-4">
            <div>
              <Label>Tempo de Espera (segundos)</Label>
              <Input
                type="number"
                value={selectedNode.data.delay || ""}
                onChange={(e) => handleChange("delay", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case "input":
        return (
          <div className="space-y-4">
            <div>
              <Label>Mensagem para o Usuário</Label>
              <Textarea
                value={selectedNode.data.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Salvar em Variável</Label>
              <Input
                value={selectedNode.data.variable || ""}
                onChange={(e) => handleChange("variable", e.target.value)}
                className="mt-2"
                placeholder="nome_da_variavel"
              />
            </div>
          </div>
        );

      case "ai":
        return (
          <div className="space-y-4">
            <div>
              <Label>Prompt para IA</Label>
              <Textarea
                value={selectedNode.data.prompt || ""}
                onChange={(e) => handleChange("prompt", e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Modelo</Label>
              <Input
                value={selectedNode.data.aiModel || "gpt-4"}
                onChange={(e) => handleChange("aiModel", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-muted-foreground">
            Selecione um nó para ver suas propriedades
          </div>
        );
    }
  };

  return (
    <Card className="w-80 h-full border-l bg-card flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Propriedades</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="mb-4">
            <Label className="text-xs text-muted-foreground">Tipo</Label>
            <p className="text-sm font-medium capitalize">{selectedNode.type}</p>
          </div>
          <Separator className="my-4" />
          {renderFields()}
        </div>
      </ScrollArea>
    </Card>
  );
};
