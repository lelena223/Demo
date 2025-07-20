#BE
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

CMD [ "npm", "start" ]