import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, User, Zap } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie as preferências da sua conta e plataforma
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Perfil</h2>
              <p className="text-sm text-muted-foreground">Informações da sua conta</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="Admin" className="bg-background border-border" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@botflow.com" className="bg-background border-border" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Salvar Alterações
            </Button>
          </div>
        </Card>

        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Notificações</h2>
              <p className="text-sm text-muted-foreground">Configure suas preferências de notificação</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações de Email</Label>
                <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Erro</Label>
                <p className="text-sm text-muted-foreground">Notificações quando um bot falha</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">Resumo semanal de atividades</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Segurança</h2>
              <p className="text-sm text-muted-foreground">Configurações de segurança e privacidade</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Logs de Atividade</Label>
                <p className="text-sm text-muted-foreground">Mantenha registro de todas as ações</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-border p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">API</h2>
              <p className="text-sm text-muted-foreground">Gerencie suas chaves de API</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">Chave API</Label>
              <div className="flex gap-2">
                <Input 
                  id="api-key" 
                  type="password" 
                  defaultValue="sk_test_1234567890abcdef" 
                  className="bg-background border-border"
                  readOnly
                />
                <Button variant="outline" className="border-border">Copiar</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use esta chave para integrar com APIs externas
              </p>
            </div>
            <Button variant="destructive">
              Gerar Nova Chave
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
