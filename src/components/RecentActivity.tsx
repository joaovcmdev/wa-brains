import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, Upload, UserPlus, Brain } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    { type: "message", message: "Nova consulta RAG processada", time: "2 min atrás", status: "Sucesso" },
    { type: "upload", message: "Documento 'FAQ Geral' atualizado", time: "15 min atrás", status: "Processado" },
    { type: "user", message: "Usuário João iniciou conversa", time: "32 min atrás", status: "Ativo" },
    { type: "message", message: "Resposta automática enviada", time: "1h atrás", status: "Entregue" },
    { type: "system", message: "Base de conhecimento sincronizada", time: "2h atrás", status: "Completo" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message": return { icon: <MessageSquare className="h-4 w-4" />, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" };
      case "upload": return { icon: <Upload className="h-4 w-4" />, color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" };
      case "user": return { icon: <UserPlus className="h-4 w-4" />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" };
      default: return { icon: <Brain className="h-4 w-4" />, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sucesso": return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
      case "Processado": return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20";
      default: return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {getInitials(activity.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <activity.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};