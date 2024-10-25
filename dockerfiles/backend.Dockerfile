FROM node:latest

WORKDIR ./app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .
RUN apt-get update && apt-get -y install python3
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["node", "index.js"]

