import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/enhanced-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Sparkles, Shield, Zap } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o usuário já está logado
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta.",
      });
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
          <div className="max-w-md fade-in">
            <div className="flex items-center gap-4 mb-8">
              <Logo size="xl" animated={true} />
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  WA-Brains
                </h1>
                <p className="text-lg text-muted-foreground">
                  Inteligência Artificial RAG
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              O futuro da automação chegou
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Transforme seu WhatsApp em uma central de atendimento inteligente 
              com nossa tecnologia RAG de última geração. Respostas instantâneas, 
              precisas e personalizadas.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  IA contextual com base de conhecimento
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Respostas em tempo real
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Segurança e privacidade garantidas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <Card className="w-full max-w-md scale-in glass backdrop-blur-xl border-white/20">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4 lg:hidden">
                <Logo size="lg" animated={true} />
              </div>
              <CardTitle className="text-2xl font-bold">
                Acesse sua conta
              </CardTitle>
              <CardDescription className="text-base">
                Entre ou cadastre-se para começar
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/20">
                  <TabsTrigger 
                    value="signin"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Cadastrar
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      leftIcon={<Mail className="w-4 h-4" />}
                      required
                    />
                    <Input
                      type="password"
                      label="Senha"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      leftIcon={<Lock className="w-4 h-4" />}
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6" 
                      size="lg"
                      variant="premium"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Entrando...
                        </div>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      leftIcon={<Mail className="w-4 h-4" />}
                      helper="Usaremos este email para confirmar sua conta"
                      required
                    />
                    <Input
                      type="password"
                      label="Senha"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      leftIcon={<Lock className="w-4 h-4" />}
                      helper="Use uma senha forte com letras, números e símbolos"
                      required
                      minLength={6}
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6" 
                      size="lg"
                      variant="premium"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Criando conta...
                        </div>
                      ) : (
                        "Criar conta"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Ao continuar, você aceita nossos{" "}
                  <button className="text-primary hover:underline">
                    Termos de Uso
                  </button>{" "}
                  e{" "}
                  <button className="text-primary hover:underline">
                    Política de Privacidade
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;