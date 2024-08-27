# Imagen base liviana de Node.js
FROM node:14-alpine
 
# Variables de entorno
ENV APP_HOME /app
 
 
# Configurar el directorio de trabajo
WORKDIR $APP_HOME
 
# Copiar solo los archivos necesarios
COPY package.json package-lock.json $APP_HOME/
RUN npm ci --only=production
 
COPY . $APP_HOME/
 
# Exponer el puerto
EXPOSE 3000
 
# Comando de inicio
CMD ["npm", "start"]