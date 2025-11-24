# Usamos Node 20
FROM node:20

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código
COPY . .

# Compilamos la app
RUN npm run build

# Exponemos puerto
EXPOSE 3001

# Comando para desarrollo
CMD ["npm", "run", "start:dev"]
