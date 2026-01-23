import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Download, Search, UserCheck, Shield, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface Member {
  name: string;
  number: string;
  admin: boolean;
}

const GroupExtractor = () => {
  const [groupId, setGroupId] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const handleExtract = async () => {
    if (!groupId.trim()) {
      toast.error("Digite o ID ou link do grupo");
      return;
    }

    setIsExtracting(true);
    toast.info("Extraindo membros do grupo...");

    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockMembers = Array.from({ length: 45 }, (_, i) => ({
      name: i % 5 === 0 ? `Admin ${Math.floor(i/5) + 1}` : `Membro ${i + 1}`,
      number: `+5511${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
      admin: i % 5 === 0
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
    
    toast.success("CSV exportado!");
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
    
    toast.success("VCF exportado!");
  };

  const adminCount = members.filter(m => m.admin).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
          <Users className="h-7 w-7 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Extrator de Grupos</h1>
          <p className="text-muted-foreground mt-1">
            Extraia todos os membros de grupos do WhatsApp em segundos
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input Section */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <h2 className="text-lg font-semibold">Extrair Membros</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-id">ID ou Link do Grupo</Label>
              <Input
                id="group-id"
                placeholder="https://chat.whatsapp.com/AbCdEf123..."
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Cole o link de convite ou ID do grupo
              </p>
            </div>

            <Button
              onClick={handleExtract}
              disabled={isExtracting}
              className="w-full gap-2"
            >
              <Search className="h-4 w-4" />
              {isExtracting ? "Extraindo..." : "Extrair Membros"}
            </Button>
          </div>

          <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-yellow-500" />
              Requisitos
            </h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Você deve ser membro do grupo</li>
              <li>• O grupo deve ser acessível</li>
              <li>• Internet estável durante extração</li>
            </ul>
          </Card>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="font-medium text-sm mb-2">💡 Como Usar</h4>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-muted-foreground">
              <li>Copie o link do grupo no WhatsApp</li>
              <li>Cole no campo acima</li>
              <li>Clique em Extrair</li>
              <li>Exporte para CSV ou VCF</li>
            </ol>
          </Card>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-3 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Membros Extraídos</h2>
            {members.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1">
                  <FileSpreadsheet className="h-3 w-3" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportVCF} className="gap-1">
                  <Download className="h-3 w-3" />
                  VCF
                </Button>
              </div>
            )}
          </div>

          {members.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-primary/10 border-primary/20">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-primary">{members.length}</p>
                    <p className="text-xs text-muted-foreground">Total de Membros</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-500">{adminCount}</p>
                    <p className="text-xs text-muted-foreground">Administradores</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="max-h-[450px] overflow-y-auto space-y-2">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{member.number}</p>
                </div>
                {member.admin && (
                  <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                    Admin
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {members.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">Nenhum membro extraído</p>
              <p className="text-sm">Cole o link do grupo e clique em Extrair</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GroupExtractor;
