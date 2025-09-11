import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, MessageSquare, Upload, UserPlus } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "message",
      user: "João Silva",
      action: "enviou uma mensagem",
      time: "2 min atrás",
      icon: MessageSquare,
    },
    {
      id: 2,
      type: "upload",
      user: "Sistema",
      action: "processou novo documento",
      time: "15 min atrás",
      icon: Upload,
    },
    {
      id: 3,
      type: "user",
      user: "Maria Santos",
      action: "iniciou conversa",
      time: "32 min atrás",
      icon: UserPlus,
    },
    {
      id: 4,
      type: "message",
      user: "Pedro Costa",
      action: "fez consulta RAG",
      time: "1h atrás",
      icon: MessageSquare,
    },
    {
      id: 5,
      type: "upload",
      user: "Admin",
      action: "atualizou FAQ",
      time: "2h atrás",
      icon: Upload,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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