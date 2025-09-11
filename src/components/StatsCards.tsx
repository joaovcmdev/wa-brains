import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatsCards = () => {
  const stats = [
    { 
      title: "Mensagens Hoje", 
      value: "1,247", 
      change: "+12%", 
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    { 
      title: "Taxa de Resposta", 
      value: "98.2%", 
      change: "+2.1%", 
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500"
    },
    { 
      title: "Tempo Médio", 
      value: "1.2s", 
      change: "-0.3s", 
      trend: "up",
      icon: Clock,
      color: "text-orange-500"
    },
    { 
      title: "Usuários Ativos", 
      value: "342", 
      change: "+18", 
      trend: "up",
      icon: Users,
      color: "text-purple-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="hover-lift bg-gradient-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 transition-all duration-300 group-hover:scale-110"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs font-medium",
                  stat.trend === "up" ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20" : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20"
                )}
              >
                {stat.change}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};