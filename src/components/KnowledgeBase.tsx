import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Plus, Search, Upload } from "lucide-react";

export const KnowledgeBase = () => {
  const documents = [
    { name: "Manual do Produto", type: "PDF", size: "2.3 MB", status: "Processado" },
    { name: "FAQ Geral", type: "TXT", size: "156 KB", status: "Processado" },
    { name: "Políticas da Empresa", type: "PDF", size: "890 KB", status: "Processando" },
    { name: "Catálogo de Serviços", type: "PDF", size: "4.1 MB", status: "Processado" },
    { name: "Tutoriais", type: "MD", size: "234 KB", status: "Processado" },
  ];

  return (
    <Card className="h-[600px] bg-gradient-card border-primary/20">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            Base de Conhecimento RAG
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover-lift">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button size="sm" variant="premium" className="shadow-glow">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[480px]">
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 hover:border-primary/30 transition-all duration-300 hover-lift group bg-card/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {doc.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={doc.status === "Processado" ? "default" : "secondary"}
                    className={doc.status === "Processado" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : ""}
                  >
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};