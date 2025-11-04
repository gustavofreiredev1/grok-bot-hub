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

      case "button":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Digite a mensagem que acompanha os botões..."
                value={config.message || ""}
                onChange={(e) => setConfig({ ...config, message: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttons">Botões (um por linha)</Label>
              <Textarea
                id="buttons"
                placeholder="Botão 1&#10;Botão 2&#10;Botão 3"
                value={config.buttons?.join("\n") || ""}
                onChange={(e) => setConfig({ ...config, buttons: e.target.value.split("\n").filter(b => b.trim()) })}
                rows={5}
              />
            </div>
          </>
        );

      case "list":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título da Lista</Label>
              <Input
                id="title"
                placeholder="Escolha uma opção"
                value={config.title || ""}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="listItems">Itens (um por linha)</Label>
              <Textarea
                id="listItems"
                placeholder="Item 1&#10;Item 2&#10;Item 3"
                value={config.listItems?.join("\n") || ""}
                onChange={(e) => setConfig({ ...config, listItems: e.target.value.split("\n").filter(i => i.trim()) })}
                rows={6}
              />
            </div>
          </>
        );

      case "input":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem para o Usuário</Label>
              <Textarea
                id="message"
                placeholder="Por favor, digite seu nome..."
                value={config.message || ""}
                onChange={(e) => setConfig({ ...config, message: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variable">Salvar Resposta em Variável</Label>
              <Input
                id="variable"
                placeholder="nome_usuario"
                value={config.variable || ""}
                onChange={(e) => setConfig({ ...config, variable: e.target.value })}
              />
            </div>
          </>
        );

      case "ai":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt para IA</Label>
              <Textarea
                id="prompt"
                placeholder="Você é um assistente útil que..."
                value={config.prompt || ""}
                onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiModel">Modelo de IA</Label>
              <Select value={config.aiModel || "gpt-4"} onValueChange={(value) => setConfig({ ...config, aiModel: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
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
