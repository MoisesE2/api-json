# Usar imagem oficial do Node.js
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar o resto dos arquivos da aplicação
COPY . .

# Criar diretório de dados se não existir
RUN mkdir -p /app/data

# Expor a porta da aplicação
EXPOSE 3008

# Comando para iniciar a aplicação
CMD ["node", "index.js"]

