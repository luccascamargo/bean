# Use a imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o código fonte
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila o TypeScript para JavaScript
RUN yarn build

# Expor a porta necessária
EXPOSE 8080

# Comando para iniciar o aplicativo
CMD ["yarn", "start"]
