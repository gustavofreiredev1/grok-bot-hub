import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Filter, Upload, Download, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const WhatsFilter = () => {
  const [numbers, setNumbers] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ number: string; status: "valid" | "invalid" | "blocked" }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setNumbers(content);
      toast.success("Arquivo carregado com sucesso!");
    };
    reader.readAsText(file);
  };

  const handleFilter = async () => {
    const numberList = numbers.split("\n").filter(n => n.trim());
    
    if (numberList.length === 0) {
      toast.error("Adicione números para filtrar");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    // Simulação de processamento
    for (let i = 0; i < numberList.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const status = Math.random() > 0.3 ? "valid" : Math.random() > 0.5 ? "invalid" : "blocked";
      
      setResults(prev => [...prev, {
        number: numberList[i].trim(),
        status: status as "valid" | "invalid" | "blocked"
      }]);
      
      setProgress(((i + 1) / numberList.length) * 100);
    }

    setIsProcessing(false);
    toast.success(`${numberList.length} números processados!`);
  };

  const handleExport = () => {
    if (results.length === 0) {
      toast.error("Nenhum resultado para exportar");
      return;
    }

    const validNumbers = results.filter(r => r.status === "valid");
    const csv = "Número,Status\n" + validNumbers.map(r => `${r.number},${r.status}`).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `numeros-validos-${Date.now()}.csv`;
    a.click();
    
    toast.success("Arquivo exportado!");
  };

  const validCount = results.filter(r => r.status === "valid").length;
  const invalidCount = results.filter(r => r.status === "invalid").length;
  const blockedCount = results.filter(r => r.status === "blocked").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Filter className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsFilter</h1>
          <p className="text-muted-foreground">
            Filtre e valide números de WhatsApp em massa
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Importar Números</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numbers">Lista de Números</Label>
              <Textarea
                id="numbers"
                rows={12}
                placeholder="Digite ou cole números (um por linha)&#10;Exemplo:&#10;+5511999999999&#10;+5521888888888"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Um número por linha, com código do país
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">Ou Carregar Arquivo CSV/TXT</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>

            <Button
              onClick={handleFilter}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processando..." : "Filtrar Números"}
            </Button>

            {isProcessing && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-xs text-center text-muted-foreground">
                  {Math.round(progress)}% completo
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resultados</h2>
            {results.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            )}
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-green-500/10 border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-500">{validCount}</p>
                    <p className="text-xs text-muted-foreground">Válidos</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-red-500/10 border-red-500/20">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-500">{invalidCount}</p>
                    <p className="text-xs text-muted-foreground">Inválidos</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-500">{blockedCount}</p>
                    <p className="text-xs text-muted-foreground">Bloqueados</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
              >
                <span className="text-sm font-mono">{result.number}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  result.status === "valid" 
                    ? "bg-green-500/20 text-green-500"
                    : result.status === "invalid"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}>
                  {result.status === "valid" ? "Válido" : result.status === "invalid" ? "Inválido" : "Bloqueado"}
                </span>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum resultado ainda</p>
              <p className="text-xs">Adicione números e clique em Filtrar</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default WhatsFilter;
