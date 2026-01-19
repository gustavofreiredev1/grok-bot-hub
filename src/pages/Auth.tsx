import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Mail, Lock, User, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").max(100, "Senha muito longa"),
  name: z.string().max(100, "Nome muito longo").optional(),
});

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, resetPassword, updatePassword, user, loading: authLoading } = useAuth();
  
  const mode = searchParams.get("mode");
  const [isLogin, setIsLogin] = useState(mode !== "signup");
  const [isResetPassword, setIsResetPassword] = useState(mode === "reset" || mode === "forgot");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  const validateForm = () => {
    try {
      authSchema.parse({
        email: formData.email,
        password: formData.password,
        name: !isLogin ? formData.name : undefined,
      });

      if (!isLogin && formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "As senhas não coincidem" });
        return false;
      }

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isResetPassword && mode === "reset") {
        // User is resetting password after clicking email link
        const { error } = await updatePassword(formData.password);
        if (error) {
          setErrors({ password: error.message });
        } else {
          navigate("/dashboard");
        }
      } else if (isResetPassword) {
        // User wants to receive reset email
        const { error } = await resetPassword(formData.email);
        if (error) {
          setErrors({ email: error.message });
        } else {
          setIsResetPassword(false);
          setIsLogin(true);
        }
      } else if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login")) {
            setErrors({ email: "Email ou senha incorretos" });
          } else {
            setErrors({ email: error.message });
          }
        } else {
          const from = (location.state as any)?.from?.pathname || "/dashboard";
          navigate(from, { replace: true });
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          if (error.message.includes("already registered")) {
            setErrors({ email: "Este email já está cadastrado" });
          } else {
            setErrors({ email: error.message });
          }
        } else {
          navigate("/dashboard");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o site
        </Button>

        <Card className="p-8 bg-gradient-card border-border shadow-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isResetPassword 
                ? (mode === "reset" ? "Nova Senha" : "Recuperar Senha")
                : (isLogin ? "Bem-vindo de volta!" : "Criar sua conta")
              }
            </h1>
            <p className="text-muted-foreground">
              {isResetPassword 
                ? (mode === "reset" ? "Digite sua nova senha" : "Informe seu email para recuperar o acesso")
                : (isLogin 
                    ? "Entre com suas credenciais para continuar" 
                    : "Comece grátis - sem cartão de crédito"
                  )
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isResetPassword && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="João Silva"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={loading}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
            )}

            {(mode !== "reset") && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            )}

            {!isResetPassword || mode === "reset" ? (
              <div className="space-y-2">
                <Label htmlFor="password">{mode === "reset" ? "Nova Senha" : "Senha"}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
            ) : null}

            {(!isLogin && !isResetPassword) && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    disabled={loading}
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            )}

            {isLogin && !isResetPassword && (
              <div className="flex justify-end">
                <Button 
                  type="button"
                  variant="link" 
                  className="px-0 text-sm text-primary"
                  onClick={() => setIsResetPassword(true)}
                >
                  Esqueceu a senha?
                </Button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full shadow-glow"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : isResetPassword ? (
                mode === "reset" ? "Atualizar Senha" : "Enviar Email de Recuperação"
              ) : isLogin ? (
                "Entrar"
              ) : (
                "Criar Conta Grátis"
              )}
            </Button>
          </form>

          {/* Toggle */}
          {!isResetPassword && (
            <>
              <Separator className="my-6" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-primary font-semibold"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                  >
                    {isLogin ? "Criar conta grátis" : "Fazer login"}
                  </Button>
                </p>
              </div>
            </>
          )}

          {isResetPassword && mode !== "reset" && (
            <div className="mt-6 text-center">
              <Button
                type="button"
                variant="link"
                className="text-sm text-primary"
                onClick={() => {
                  setIsResetPassword(false);
                  setErrors({});
                }}
              >
                Voltar para o login
              </Button>
            </div>
          )}

          {/* Terms */}
          {!isLogin && !isResetPassword && (
            <p className="mt-6 text-xs text-center text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{" "}
              <a href="/terms" className="text-primary hover:underline">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </a>
            </p>
          )}
        </Card>

        {/* Benefits */}
        {!isLogin && !isResetPassword && (
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Bots Grátis</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">100</p>
              <p className="text-xs text-muted-foreground">Msgs/dia</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-xs text-muted-foreground">Suporte</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
