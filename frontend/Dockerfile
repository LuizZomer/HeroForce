# -------------------------
# STAGE 1: Build do React
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# -------------------------
# STAGE 2: Servidor leve com Vite preview
# -------------------------
FROM node:20-alpine

WORKDIR /app

# Copia o build e dependências mínimas
COPY --from=builder /app /app

# Instala apenas as dependências de produção
RUN npm install 

# Expõe a porta padrão do Vite (5173)
EXPOSE 5173

# Comando para servir o build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
