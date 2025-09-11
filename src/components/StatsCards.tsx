import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Brain, TrendingUp } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Mensagens Hoje",
      value: "127",
      change: "+12%",
      icon: MessageSquare,
    },
    {
      title: "Usuários Ativos",
      value: "43",
      change: "+8%",
      icon: Users,
    },
    {
      title: "Consultas RAG",
      value: "89",
      change: "+23%",
      icon: Brain,
    },
    {
      title: "Taxa de Sucesso",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-primary mt-1">{stat.change} desde ontem</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};