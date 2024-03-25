# Etapa de construção da aplicação
FROM node:latest as builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o código fonte
COPY . .

# Constrói a aplicação
RUN yarn build

# Etapa de execução da aplicação
FROM nginx:latest

# Copia os arquivos construídos da etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta do servidor web
EXPOSE 80

# O comando padrão do nginx é iniciar o servidor web
CMD ["nginx", "-g", "daemon off;"]
