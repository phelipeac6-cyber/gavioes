# Estágio 1: Construir a aplicação React
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Constrói a aplicação para produção
RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copia os arquivos construídos do estágio anterior para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]