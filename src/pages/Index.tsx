import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">
            🤖 WA-Brains Chatbot
          </h1>
          <p className="text-xl text-muted-foreground">
            Carregando...
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // O useEffect vai redirecionar para /auth
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">
            🤖 WA-Brains Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Olá, {user.email}
            </span>
            <Button variant="outline" onClick={signOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Bem-vindo ao Dashboard
          </h2>
          <p className="text-xl text-muted-foreground">
            Sistema RAG para WhatsApp conectado e funcionando!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
