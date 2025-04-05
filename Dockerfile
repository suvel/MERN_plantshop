# Use an official Node.js image as a base
FROM node:18-bookworm-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .


WORKDIR /app/frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY frontend/ .

RUN npm run build

WORKDIR /app

EXPOSE 27017

CMD ["npm", "run","seedStart"]
