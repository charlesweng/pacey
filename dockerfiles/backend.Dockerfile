FROM node:latest
# Use bash instead of sh
SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .
RUN apt-get update && apt-get -y install python3 python3-pip
RUN apt-get -y install python3.11-venv
RUN python3 -m venv /venv/
RUN /venv/bin/pip3 install --no-cache-dir -r requirements.txt


EXPOSE 8000

CMD ["node", "index.js"]

