import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/StatsCards";
import { ChatInterface } from "@/components/ChatInterface";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { RecentActivity } from "@/components/RecentActivity";
import { Logo } from "@/components/ui/logo";
import { Settings, Bell, User, LogOut } from "lucide-react";

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
        <div className="text-center space-y-8 scale-in">
          <div className="flex justify-center mb-6">
            <Logo size="xl" animated={true} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              WA-Brains Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Carregando sistema RAG...
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // O useEffect vai redirecionar para /auth
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Enhanced Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo size="md" animated={true} />
              <div className="fade-in">
                <h1 className="text-2xl font-bold text-foreground">
                  WA-Brains Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sistema RAG Inteligente
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover-lift">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-lift">
                <Settings className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">
                    {user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Administrador
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={signOut} 
                  size="sm"
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="fade-in">
          <div className="text-center lg:text-left max-w-4xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Bem-vindo de volta! 👋
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Aqui está um resumo da atividade do seu chatbot hoje.
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="scale-in">
          <StatsCards />
        </section>

        {/* Main Dashboard Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 fade-in">
          <ChatInterface />
          <KnowledgeBase />
        </section>

        {/* Recent Activity */}
        <section className="fade-in">
          <RecentActivity />
        </section>
      </main>
    </div>
  );
};

export default Index;
