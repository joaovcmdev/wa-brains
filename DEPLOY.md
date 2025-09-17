# 🚀 WA-Brains - Guia de Deploy no Google Cloud

Este guia fornece instruções completas para fazer o deploy da aplicação WA-Brains no Google Cloud App Engine.

## 📋 Pré-requisitos

### 1. Configuração do Google Cloud
- Conta no Google Cloud Platform
- Projeto criado no GCP
- Faturamento habilitado no projeto
- Google Cloud SDK instalado localmente

### 2. Instalação do Google Cloud SDK

#### Windows:
```bash
# Baixar e instalar o Google Cloud SDK
# https://cloud.google.com/sdk/docs/install-windows
```

#### macOS:
```bash
# Usando Homebrew
brew install google-cloud-sdk
```

#### Linux (Ubuntu/Debian):
```bash
# Adicionar repositório
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Instalar
sudo apt-get update && sudo apt-get install google-cloud-cli
```

### 3. Autenticação
```bash
# Fazer login na sua conta Google
gcloud auth login

# Configurar projeto (substitua YOUR_PROJECT_ID)
gcloud config set project YOUR_PROJECT_ID

# Verificar configuração
gcloud config list
```

## 🛠️ Configuração do Projeto

### 1. Habilitar APIs Necessárias
```bash
# App Engine Admin API
gcloud services enable appengine.googleapis.com

# Cloud Build API (se usando CI/CD)
gcloud services enable cloudbuild.googleapis.com

# Cloud Logging API
gcloud services enable logging.googleapis.com
```

### 2. Criar App Engine (primeira vez)
```bash
# Escolher região (exemplos):
# us-central1 (Iowa, EUA)
# southamerica-east1 (São Paulo, Brasil)
# europe-west1 (Bélgica, Europa)

gcloud app create --region=southamerica-east1
```

## 🚀 Deploy Automático (Recomendado)

### Método 1: Script Automático
```bash
# Dar permissão de execução
chmod +x deploy.sh

# Executar deploy
./deploy.sh YOUR_PROJECT_ID
```

### Método 2: Deploy Manual
```bash
# 1. Instalar dependências
npm ci

# 2. Build da aplicação
npm run build

# 3. Deploy
gcloud app deploy app.yaml --quiet
```

## ⚙️ Configurações de Ambiente

### Variáveis de Ambiente no app.yaml
```yaml
env_variables:
  NODE_ENV: production
  VITE_SUPABASE_URL: "sua-url-supabase"
  VITE_SUPABASE_PUBLISHABLE_KEY: "sua-chave-publica"
```

### Configuração de Scaling
```yaml
automatic_scaling:
  min_instances: 1        # Instâncias mínimas
  max_instances: 10       # Instâncias máximas
  target_cpu_utilization: 0.6  # CPU alvo
```

## 🔧 Configurações Avançadas

### SSL/HTTPS
O App Engine automaticamente fornece certificado SSL para domínios *.appspot.com

### Domínio Personalizado
```bash
# Mapear domínio customizado
gcloud app domain-mappings create yourdomain.com
```

### Logs e Monitoramento
```bash
# Ver logs em tempo real
gcloud app logs tail -s default

# Ver logs no console
https://console.cloud.google.com/logs/query;query=resource.type%3D%22gae_app%22
```

## 📊 Monitoramento e Performance

### Health Checks
A aplicação inclui health checks configurados:
- **Readiness**: `/health` (5s interval)
- **Liveness**: `/health` (30s interval)

### Métricas Importantes
- Latência de resposta
- Taxa de erro (target: <1%)
- CPU utilization (target: <60%)
- Memory usage

### Alertas Recomendados
```bash
# Configurar alertas no Google Cloud Console
# - CPU > 80% por 5 minutos
# - Taxa de erro > 5% por 2 minutos
# - Latência > 2s por 5 minutos
```

## 🔒 Segurança

### Configurações de Segurança
- HTTPS forçado (secure: always)
- Headers de segurança configurados
- Rate limiting implementado
- CORS configurado adequadamente

### Firewall Rules (se necessário)
```bash
# Permitir apenas tráfego HTTPS
gcloud app firewall-rules create 100 --action=allow --source-range="*" --description="Allow HTTPS"
```

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Build Falhando
```bash
# Limpar cache
rm -rf node_modules dist
npm ci
npm run build
```

#### 2. App Não Carregando
- Verificar logs: `gcloud app logs tail -s default`
- Verificar variáveis de ambiente
- Verificar configuração do Supabase

#### 3. 502/504 Errors
- Verificar health check endpoints
- Aumentar timeout se necessário
- Verificar memory limits

#### 4. Problemas de CORS
- Verificar configuração no Supabase
- Verificar headers no app.yaml

### Comandos Úteis
```bash
# Status do app
gcloud app describe

# Versões deployadas
gcloud app versions list

# Abrir app no browser
gcloud app browse

# Rollback para versão anterior
gcloud app versions stop VERSION_ID
gcloud app services set-traffic default --splits=PREVIOUS_VERSION=1
```

## 📈 Otimizações de Performance

### 1. Caching
- Assets estáticos: 30 dias
- Imagens: 7 dias
- Arquivos root: 1 dia

### 2. Compressão
Habilitada automaticamente pelo App Engine:
- Gzip para texto/HTML/CSS/JS
- Brotli para navegadores compatíveis

### 3. CDN
```bash
# Habilitar Cloud CDN (opcional)
gcloud compute backend-services update --global --enable-cdn
```

## 💰 Custos

### Estimativa de Custos
- **Instância F1**: ~$7/mês (730 horas)
- **Tráfego**: $0.12/GB (após 1GB gratuito/dia)
- **Operações**: $0.50/milhão (após 50k gratuitas/dia)

### Free Tier
- 28 horas de instância F1/dia
- 1 GB de tráfego de saída/dia
- 50k operações de datastore/dia

### Otimização de Custos
```yaml
# Configurar instâncias menores
resources:
  cpu: 0.5
  memory_gb: 0.25

# Auto-scaling agressivo
automatic_scaling:
  min_instances: 0
  max_instances: 5
```

## 🔄 CI/CD (Opcional)

### GitHub Actions
Arquivo `.github/workflows/deploy.yml` pode ser criado para deploy automático.

### Cloud Build
Use `cloudbuild.yaml` para builds automatizados no Google Cloud.

## 📞 Suporte

### Links Úteis
- [Documentação App Engine](https://cloud.google.com/appengine/docs)
- [Pricing Calculator](https://cloud.google.com/products/calculator)
- [Status Page](https://status.cloud.google.com/)

### Contato
- **Suporte Técnico**: [Criar issue no repositório]
- **Documentação**: Este arquivo README
- **Logs**: Google Cloud Console > Logging

---

## ✅ Checklist de Deploy

Antes de fazer o deploy, verifique:

- [ ] Google Cloud SDK instalado e autenticado
- [ ] Projeto criado e faturamento habilitado
- [ ] APIs necessárias habilitadas
- [ ] Variáveis de ambiente configuradas
- [ ] Build da aplicação funcionando localmente
- [ ] Configuração do Supabase validada
- [ ] Testes passando
- [ ] app.yaml revisado
- [ ] Domínio personalizado configurado (se aplicável)

**Comando final:**
```bash
./deploy.sh YOUR_PROJECT_ID
```

🎉 **Parabéns! Seu WA-Brains está no ar!** 🎉