import { useState, useCallback } from "react";
import { Upload, File, Image, Video, FileText, X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  preview?: string;
}

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => {
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      return {
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading" as const,
        preview,
      };
    });

    setFiles((prev) => [...prev, ...uploadedFiles]);

    // Simulate upload progress
    uploadedFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress: 100, status: "completed" } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
          );
        }
      }, 200);
    });

    toast.success(`${newFiles.length} arquivo(s) adicionado(s)`);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="h-5 w-5" />;
    if (type.startsWith("video/")) return <Video className="h-5 w-5" />;
    if (type.includes("pdf")) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload de Arquivos</h1>
        <p className="text-muted-foreground">Envie arquivos para seus grupos com facilidade</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Enviado</p>
              <p className="text-xl font-bold text-foreground">2.4 GB</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <Image className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Imagens</p>
              <p className="text-xl font-bold text-foreground">345</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Vídeos</p>
              <p className="text-xl font-bold text-foreground">67</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-subtle border-border">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Documentos</p>
              <p className="text-xl font-bold text-foreground">123</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Drag & Drop Zone */}
          <Card
            className={`p-8 border-2 border-dashed transition-all ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border bg-card"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Arraste e solte seus arquivos aqui
                </h3>
                <p className="text-sm text-muted-foreground">
                  ou clique no botão abaixo para selecionar
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Selecionar Arquivos
                </label>
              </Button>
              <p className="text-xs text-muted-foreground">
                Suporta: PDF, Imagens (JPG, PNG), Vídeos (MP4), Documentos (até 50MB)
              </p>
            </div>
          </Card>

          {/* Destination */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Destino do Envio</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination">Selecionar Grupos</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="destination">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Grupos</SelectItem>
                    <SelectItem value="1">Grupo Vendas</SelectItem>
                    <SelectItem value="2">Suporte Premium</SelectItem>
                    <SelectItem value="3">Marketing Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="caption">Legenda (Opcional)</Label>
                <Input id="caption" placeholder="Adicione uma legenda ao arquivo..." />
              </div>

              <Button className="w-full" disabled={files.length === 0}>
                <Send className="h-4 w-4 mr-2" />
                Enviar {files.length > 0 && `(${files.length})`}
              </Button>
            </div>
          </Card>

          {/* Files List */}
          {files.length > 0 && (
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Arquivos ({files.length})
              </h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="text-primary">{getFileIcon(file.type)}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="mt-2 h-1" />
                      )}
                    </div>
                    {file.status === "completed" && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Guide */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-primary border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">📖 Como Usar</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">1. Adicione Arquivos</p>
                <p>Arraste arquivos ou clique em "Selecionar Arquivos"</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">2. Escolha o Destino</p>
                <p>Selecione para quais grupos enviar</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">3. Configure</p>
                <p>Adicione legendas se necessário</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">4. Envie</p>
                <p>Clique em "Enviar" e acompanhe o progresso</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">⚡ Dicas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Tamanho máximo: 50MB por arquivo</li>
              <li>• Múltiplos arquivos aceitos</li>
              <li>• Formatos: PDF, JPG, PNG, MP4</li>
              <li>• Compressão automática ativa</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
