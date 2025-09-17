# 🧠 WA-Brains - Chatbot WhatsApp com RAG

Sistema avançado de chatbot para WhatsApp utilizando tecnologia RAG (Retrieval-Augmented Generation) para fornecer respostas inteligentes baseadas em uma base de conhecimento personalizada.

## 🚀 Funcionalidades

- **Chatbot Inteligente**: Interface de conversação avançada com IA
- **Sistema RAG**: Recuperação e geração de respostas baseadas em conhecimento
- **Base de Conhecimento**: Gerenciamento de documentos e informações
- **Dashboard Analytics**: Métricas e estatísticas em tempo real
- **Autenticação Segura**: Sistema de login com Supabase Auth
- **Design Responsivo**: Interface otimizada para todos os dispositivos
- **Performance**: Carregamento rápido e experiência fluida

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI + Shadcn/ui
- **Backend**: Supabase (Auth, Database, Real-time)
- **Deploy**: Google Cloud App Engine
- **Build Tools**: Vite + ESBuild

## 🌐 Deploy em Produção

Este projeto está configurado para deploy automático no Google Cloud App Engine.

### Quick Start
```bash
# 1. Clone o repositório
git clone [repository-url]

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env

# 4. Execute o deploy
./deploy.sh YOUR_PROJECT_ID
```

### Documentação Completa
Consulte [DEPLOY.md](./DEPLOY.md) para instruções detalhadas de deploy.

## 🔧 Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: Otimizado para todas as métricas
- **Bundle Size**: Otimizado com code splitting
- **Loading Speed**: < 2s para first contentful paint

## 🔒 Segurança

- Autenticação JWT com Supabase
- Row Level Security (RLS) no banco de dados
- HTTPS obrigatório em produção
- Headers de segurança configurados
- Validação de dados client e server-side

## 🎨 Design System

O projeto utiliza um design system personalizado baseado em:
- **Colors**: Paleta WhatsApp Green + Dark Theme
- **Typography**: Inter + JetBrains Mono
- **Spacing**: Sistema de espaçamento 8px
- **Components**: Componentes reutilizáveis com variants

## 📱 PWA Ready

- Manifest configurado
- Service Worker implementado
- Installable app
- Offline support

## 🚀 Deployment Status

[![Deploy Status](https://img.shields.io/badge/deploy-production-success)](https://wa-brains.app)
[![Build Status](https://img.shields.io/badge/build-passing-success)](https://console.cloud.google.com)
[![Performance](https://img.shields.io/badge/lighthouse-95%2B-success)](https://pagespeed.web.dev)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**WA-Brains Team** - Sistema de Chatbot WhatsApp com IA