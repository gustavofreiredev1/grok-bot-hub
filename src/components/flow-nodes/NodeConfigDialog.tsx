import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface NodeConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nodeType: string;
  nodeData: any;
  onSave: (data: any) => void;
}

export const NodeConfigDialog = ({ isOpen, onClose, nodeType, nodeData, onSave }: NodeConfigDialogProps) => {
  const [config, setConfig] = useState<any>(nodeData || {});

  useEffect(() => {
    setConfig(nodeData || {});
  }, [nodeData]);

  const handleSave = () => {
    if (nodeType === "message" && !config.message?.trim()) {
      toast.error("Digite uma mensagem");
      return;
    }
    onSave(config);
    toast.success("Configuração salva!");
    onClose();
  };

  const renderFields = () => {
    switch (nodeType) {
      case "message":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Digite a mensagem que será enviada..."
                value={config.message || ""}
                onChange={(e) => setConfig({ ...config, message: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Legenda (opcional)</Label>
              <Input
                id="caption"
                placeholder="Legenda para a mensagem"
                value={config.caption || ""}
                onChange={(e) => setConfig({ ...config, caption: e.target.value })}
              />
            </div>
          </>
        );

      case "audio":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="audioUrl">URL do Áudio</Label>
              <Input
                id="audioUrl"
                placeholder="https://exemplo.com/audio.mp3"
                value={config.audioUrl || ""}
                onChange={(e) => setConfig({ ...config, audioUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audioCaption">Legenda</Label>
              <Input
                id="audioCaption"
                placeholder="Legenda do áudio"
                value={config.caption || ""}
                onChange={(e) => setConfig({ ...config, caption: e.target.value })}
              />
            </div>
          </>
        );

      case "image":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                placeholder="https://exemplo.com/imagem.jpg"
                value={config.imageUrl || ""}
                onChange={(e) => setConfig({ ...config, imageUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageCaption">Legenda</Label>
              <Input
                id="imageCaption"
                placeholder="Legenda da imagem"
                value={config.caption || ""}
                onChange={(e) => setConfig({ ...config, caption: e.target.value })}
              />
            </div>
          </>
        );

      case "video":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">URL do Vídeo</Label>
              <Input
                id="videoUrl"
                placeholder="https://exemplo.com/video.mp4"
                value={config.videoUrl || ""}
                onChange={(e) => setConfig({ ...config, videoUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoCaption">Legenda</Label>
              <Input
                id="videoCaption"
                placeholder="Legenda do vídeo"
                value={config.caption || ""}
                onChange={(e) => setConfig({ ...config, caption: e.target.value })}
              />
            </div>
          </>
        );

      case "delay":
        return (
          <div className="space-y-2">
            <Label htmlFor="delay">Tempo de Espera (segundos)</Label>
            <Input
              id="delay"
              type="number"
              placeholder="5"
              value={config.delay || ""}
              onChange={(e) => setConfig({ ...config, delay: e.target.value })}
            />
          </div>
        );

      case "condition":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="variable">Variável</Label>
              <Input
                id="variable"
                placeholder="Ex: resposta_usuario"
                value={config.variable || ""}
                onChange={(e) => setConfig({ ...config, variable: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operator">Operador</Label>
              <Select value={config.operator || "equals"} onValueChange={(value) => setConfig({ ...config, operator: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Igual a</SelectItem>
                  <SelectItem value="not_equals">Diferente de</SelectItem>
                  <SelectItem value="contains">Contém</SelectItem>
                  <SelectItem value="not_contains">Não contém</SelectItem>
                  <SelectItem value="greater">Maior que</SelectItem>
                  <SelectItem value="less">Menor que</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Valor</Label>
              <Input
                id="value"
                placeholder="Valor para comparação"
                value={config.value || ""}
                onChange={(e) => setConfig({ ...config, value: e.target.value })}
              />
            </div>
          </>
        );

      case "webhook":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">URL do Webhook</Label>
              <Input
                id="url"
                placeholder="https://api.exemplo.com/webhook"
                value={config.url || ""}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Método HTTP</Label>
              <Select value={config.method || "POST"} onValueChange={(value) => setConfig({ ...config, method: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Body (JSON)</Label>
              <Textarea
                id="body"
                placeholder='{"key": "value"}'
                value={config.body || ""}
                onChange={(e) => setConfig({ ...config, body: e.target.value })}
                rows={4}
              />
            </div>
          </>
        );

      case "action":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="actionType">Tipo de Ação</Label>
              <Select value={config.actionType || "save_variable"} onValueChange={(value) => setConfig({ ...config, actionType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="save_variable">Salvar Variável</SelectItem>
                  <SelectItem value="send_email">Enviar Email</SelectItem>
                  <SelectItem value="save_database">Salvar no Banco</SelectItem>
                  <SelectItem value="call_api">Chamar API</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="actionValue">Valor/Configuração</Label>
              <Textarea
                id="actionValue"
                placeholder="Configure a ação..."
                value={config.actionValue || ""}
                onChange={(e) => setConfig({ ...config, actionValue: e.target.value })}
                rows={3}
              />
            </div>
          </>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="label">Nome do Nó</Label>
            <Input
              id="label"
              placeholder="Nome descritivo"
              value={config.label || ""}
              onChange={(e) => setConfig({ ...config, label: e.target.value })}
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurar Nó: {nodeType}</DialogTitle>
          <DialogDescription>
            Configure as propriedades deste nó do fluxo
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {renderFields()}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Configuração
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
