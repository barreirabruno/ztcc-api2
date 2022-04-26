FROM node:14.17-alpine AS PROD_DEPENDENCIES
WORKDIR /app/
COPY package.json .
RUN npm install --only=prod
COPY . .

FROM node:14.17-alpine AS BUILD
WORKDIR /app/
COPY package.json package-lock.json ./
COPY . .
RUN npm install && npm run build