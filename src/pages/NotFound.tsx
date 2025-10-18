import { useNavigate } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full p-8 bg-gradient-card border-border text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-destructive/10">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Página não encontrada</p>
        <p className="text-sm text-muted-foreground mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button onClick={() => navigate("/")} className="w-full">
          <Home className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
