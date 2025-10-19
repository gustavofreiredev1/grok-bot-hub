import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Download, Search } from "lucide-react";
import { toast } from "sonner";

const ExporterGroup = () => {
  const [groupId, setGroupId] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [members, setMembers] = useState<{ name: string; number: string; admin: boolean }[]>([]);

  const handleExtract = async () => {
    if (!groupId.trim()) {
      toast.error("Digite o ID ou link do grupo");
      return;
    }

    setIsExtracting(true);
    toast.info("Extraindo membros do grupo...");

    // Simulação de extração
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockMembers = Array.from({ length: 25 }, (_, i) => ({
      name: `Membro ${i + 1}`,
      number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
      admin: i < 3
    }));

    setMembers(mockMembers);
    setIsExtracting(false);
    toast.success(`${mockMembers.length} membros extraídos!`);
  };

  const handleExportCSV = () => {
    if (members.length === 0) {
      toast.error("Nenhum membro para exportar");
      return;
    }

    const csv = "Nome,Número,Admin\n" + members.map(m => `${m.name},${m.number},${m.admin ? "Sim" : "Não"}`).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grupo-membros-${Date.now()}.csv`;
    a.click();
    
    toast.success("CSV exportado com sucesso!");
  };

  const handleExportVCF = () => {
    if (members.length === 0) {
      toast.error("Nenhum membro para exportar");
      return;
    }

    const vcf = members.map(m => 
      `BEGIN:VCARD\nVERSION:3.0\nFN:${m.name}\nTEL:${m.number}\nEND:VCARD`
    ).join("\n\n");
    
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contatos-grupo-${Date.now()}.vcf`;
    a.click();
    
    toast.success("VCF exportado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exporter Group</h1>
          <p className="text-muted-foreground">
            Extraia todos os membros de grupos do WhatsApp em segundos
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Extrair Membros</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-id">ID ou Link do Grupo</Label>
              <Input
                id="group-id"
                placeholder="https://chat.whatsapp.com/..."
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Cole o link de convite do grupo ou ID
              </p>
            </div>

            <Button
              onClick={handleExtract}
              disabled={isExtracting}
              className="w-full"
            >
              <Search className="mr-2 h-4 w-4" />
              {isExtracting ? "Extraindo..." : "Extrair Membros"}
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-muted space-y-2">
            <h3 className="font-semibold text-sm">⚠️ Requisitos:</h3>
            <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
              <li>Você deve ser administrador do grupo</li>
              <li>O grupo deve ser público ou você ter o link</li>
              <li>Internet estável durante a extração</li>
              <li>Respeite a privacidade dos membros</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
            <h3 className="font-semibold text-sm">💡 Como Usar:</h3>
            <ol className="text-xs space-y-1 list-decimal list-inside">
              <li>Copie o link do grupo no WhatsApp</li>
              <li>Cole aqui e clique em Extrair</li>
              <li>Aguarde o processamento</li>
              <li>Exporte para CSV ou contatos VCF</li>
            </ol>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Membros Extraídos</h2>
            {members.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportVCF}>
                  <Download className="mr-2 h-4 w-4" />
                  VCF
                </Button>
              </div>
            )}
          </div>

          {members.length > 0 && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm">
                <strong>{members.length}</strong> membros encontrados
                {" • "}
                <strong>{members.filter(m => m.admin).length}</strong> admins
              </p>
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto space-y-2">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
              >
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{member.number}</p>
                </div>
                {member.admin && (
                  <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                    Admin
                  </span>
                )}
              </div>
            ))}
          </div>

          {members.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum membro extraído ainda</p>
              <p className="text-xs">Digite o ID do grupo e clique em Extrair</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ExporterGroup;
