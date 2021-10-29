FROM node:16.6.1
WORKDIR /app
COPY . .
RUN npm install mysql2 mqtt
EXPOSE 1883
EXPOSE 3306
CMD [ "node","mySql.js" ]