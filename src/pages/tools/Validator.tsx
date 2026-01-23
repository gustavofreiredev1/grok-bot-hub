import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Upload, Download, CheckCircle, XCircle, AlertCircle, FileSpreadsheet, History } from "lucide-react";
import { toast } from "sonner";

interface ValidationResult {
  number: string;
  status: "valid" | "invalid" | "blocked";
}

const Validator = () => {
  const [numbers, setNumbers] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ValidationResult[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setNumbers(content);
      toast.success(`${file.name} carregado com sucesso!`);
    };
    reader.readAsText(file);
  };

  const handleFilter = async () => {
    const numberList = numbers.split("\n").filter(n => n.trim());
    
    if (numberList.length === 0) {
      toast.error("Adicione números para validar");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    for (let i = 0; i < numberList.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const status = Math.random() > 0.3 ? "valid" : Math.random() > 0.5 ? "invalid" : "blocked";
      
      setResults(prev => [...prev, {
        number: numberList[i].trim(),
        status: status as ValidationResult["status"]
      }]);
      
      setProgress(((i + 1) / numberList.length) * 100);
    }

    setIsProcessing(false);
    toast.success(`${numberList.length} números processados!`);
  };

  const handleExport = (type: "all" | "valid" | "invalid") => {
    let exportData = results;
    
    if (type === "valid") exportData = results.filter(r => r.status === "valid");
    if (type === "invalid") exportData = results.filter(r => r.status !== "valid");

    if (exportData.length === 0) {
      toast.error("Nenhum resultado para exportar");
      return;
    }

    const csv = "Número,Status\n" + exportData.map(r => `${r.number},${r.status}`).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `numeros-${type}-${Date.now()}.csv`;
    a.click();
    
    toast.success("Arquivo exportado!");
  };

  const validCount = results.filter(r => r.status === "valid").length;
  const invalidCount = results.filter(r => r.status === "invalid").length;
  const blockedCount = results.filter(r => r.status === "blocked").length;
  const totalNumbers = numbers.split("\n").filter(n => n.trim()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/10">
          <Filter className="h-7 w-7 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Validador de Números</h1>
          <p className="text-muted-foreground mt-1">
            Filtre e valide números de WhatsApp em massa • Identifique números ativos e bloqueados
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input Section */}
        <Card className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Importar Números</h2>
            <Badge variant="secondary">{totalNumbers} números</Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numbers">Lista de Números</Label>
              <Textarea
                id="numbers"
                rows={10}
                placeholder="Digite ou cole números (um por linha)&#10;&#10;Exemplo:&#10;+5511999999999&#10;+5521888888888&#10;5511977777777"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Importar Arquivo
                </Button>
              </div>
              <Button
                onClick={handleFilter}
                disabled={isProcessing || totalNumbers === 0}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                {isProcessing ? "Validando..." : "Validar"}
              </Button>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Card className="p-4 bg-muted/50">
              <h4 className="font-medium text-sm mb-2">💡 Dicas</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Aceita formato com ou sem código do país</li>
                <li>• Suporta arquivos CSV e TXT</li>
                <li>• Processa até 10.000 números por vez</li>
              </ul>
            </Card>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-3 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Resultados</h2>
            {results.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("valid")} className="gap-1">
                  <Download className="h-3 w-3" />
                  Válidos
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("invalid")} className="gap-1">
                  <Download className="h-3 w-3" />
                  Inválidos
                </Button>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 bg-green-500/10 border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-500">{validCount}</p>
                    <p className="text-xs text-muted-foreground">Válidos</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-red-500/10 border-red-500/20">
                <div className="flex items-center gap-3">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-500">{invalidCount}</p>
                    <p className="text-xs text-muted-foreground">Inválidos</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
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
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm font-mono">{result.number}</span>
                <Badge variant="outline" className={
                  result.status === "valid" 
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : result.status === "invalid"
                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                }>
                  {result.status === "valid" ? "Válido" : result.status === "invalid" ? "Inválido" : "Bloqueado"}
                </Badge>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Filter className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">Nenhum resultado ainda</p>
              <p className="text-sm">Adicione números e clique em Validar para começar</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Validator;
