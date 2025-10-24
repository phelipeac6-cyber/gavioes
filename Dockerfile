# Etapa de build: compila o app com Vite
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package.json package-lock*.json ./
RUN npm install

# Copia o código e gera a build
COPY . .
RUN npm run build

# Etapa de runtime: Nginx servindo os arquivos estáticos
FROM nginx:alpine AS runner

# Copia a configuração do Nginx do projeto para o container
# Certifique-se de que seu nginx.conf esteja configurado para escutar na porta 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia a build gerada para o diretório público do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 3000
EXPOSE 3000

# Inicializa o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]