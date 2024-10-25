FROM node:latest

WORKDIR ./app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

EXPOSE 8000

CMD ["node", "index.js"]

