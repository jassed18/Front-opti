# Imagen base liviana de Node.js
FROM node:14-alpine

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]