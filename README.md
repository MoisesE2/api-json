# api-json

API REST desenvolvida com Express.js que utiliza JSON como banco de dados.

## 🚀 Deploy na VPS com Dockploy

### Pré-requisitos

- VPS com Dockploy instalado e configurado
- Acesso ao painel do Dockploy
- Repositório Git (opcional, mas recomendado)

### Passo a Passo no Dockploy

#### 1. Acessar o Painel do Dockploy

- Abra seu navegador e acesse: `http://seu-ip-vps:3000` (ou o endereço configurado do Dockploy)
- Faça login com suas credenciais

#### 2. Criar Nova Aplicação

1. No painel do Dockploy, clique em **"Nova Aplicação"** ou **"Add Application"**
2. Escolha o tipo: **"Docker"** ou **"Dockerfile"**

#### 3. Configurar a Aplicação

Preencha os seguintes campos:

**Informações Básicas:**
- **Nome da Aplicação**: `api-json` (ou o nome que preferir)
- **Repositório Git** (se usar Git):
  - URL do repositório
  - Branch: `main` (ou `master`)
  - Ou faça upload dos arquivos diretamente

**Configurações Docker:**
- **Dockerfile Path**: `Dockerfile` (ou deixe em branco se estiver na raiz)
- **Build Context**: `.` (raiz do projeto)

**Portas:**
- **Porta do Container**: `3008`
- **Porta Externa**: `3008` (ou outra porta disponível)

**Volumes (Importante para persistência dos dados):**
- **Host Path**: `/caminho/para/data` (caminho na VPS onde ficará o `db.json`)
- **Container Path**: `/app/data`
- **Mount Point**: `/app/data`

**Variáveis de Ambiente (Opcional):**
- `NODE_ENV=production`

**Restart Policy:**
- Selecione: **"unless-stopped"** ou **"always"**

#### 4. Fazer Deploy

1. Clique em **"Deploy"** ou **"Implantar"**
2. O Dockploy irá:
   - Clonar o repositório (se configurado)
   - Construir a imagem Docker usando o `Dockerfile`
   - Criar e iniciar o container
   - Expor a aplicação na porta configurada

#### 5. Verificar o Deploy

1. Acesse a aba **"Logs"** para ver os logs em tempo real
2. Verifique se aparece: `Servidor rodando: http://localhost:3008`
3. Teste a API acessando: `http://seu-ip-vps:3008`

#### 6. Configurar Domínio (Opcional)

No Dockploy, você pode configurar um domínio personalizado:
1. Vá em **"Domains"** ou **"Domínios"**
2. Adicione seu domínio
3. Configure o proxy reverso (geralmente automático)

### Configuração do Volume para Persistência

⚠️ **IMPORTANTE**: Para que os dados do `db.json` sejam persistidos, configure o volume corretamente:

**No Dockploy:**
- **Host Path**: Crie um diretório na VPS, ex: `/home/usuario/dockploy-data/api-json/data`
- **Container Path**: `/app/data`
- Isso garante que os dados não sejam perdidos ao reiniciar o container

**Ou via SSH na VPS:**
```bash
# Criar diretório para os dados
mkdir -p /home/usuario/dockploy-data/api-json/data

# Copiar o db.json inicial (se necessário)
# O arquivo será criado automaticamente quando a API rodar pela primeira vez
```

### Atualizar a Aplicação

1. **Se usar Git:**
   - Faça push das mudanças para o repositório
   - No Dockploy, clique em **"Redeploy"** ou **"Rebuild"**

2. **Se fizer upload manual:**
   - Faça upload dos arquivos atualizados
   - Clique em **"Redeploy"** ou **"Rebuild"**

### Gerenciar a Aplicação no Dockploy

- **Logs**: Visualize logs em tempo real na aba "Logs"
- **Restart**: Reinicie o container com um clique
- **Stop/Start**: Pare ou inicie a aplicação
- **Settings**: Ajuste configurações, portas, volumes e variáveis de ambiente
- **Terminal**: Acesse o terminal do container diretamente pelo painel

### Backup do Banco de Dados

Como o volume está mapeado, você pode fazer backup diretamente na VPS:

```bash
# Via SSH na VPS
cp /home/usuario/dockploy-data/api-json/data/db.json /backup/db.json.backup
```

Ou configure backups automáticos no Dockploy (se disponível na sua versão).

## 📝 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Rodar em produção
npm start
```

## 🔌 Endpoints

- `GET /` - Status da API
- `GET /items` - Listar todos os items
- `GET /items/:id` - Buscar item por ID
- `POST /items` - Criar novo item
- `PUT /items/:id` - Atualizar item
- `DELETE /items/:id` - Deletar item

## 📦 Arquivos Docker

O projeto inclui:
- `Dockerfile` - Configuração da imagem Docker
- `docker-compose.yml` - Configuração alternativa (se não usar Dockploy)
- `.dockerignore` - Arquivos ignorados no build
