FROM node:14.15-alpine as auth

WORKDIR /app/auth-service

COPY ./package.json ./package-lock.json /app/auth-service/
RUN npm install

RUN mkdir /app/auth-service/src
COPY ./src /app/auth-service/src

CMD ["node", "./src/server.js"]

# FROM node:14.15-alpine

# WORKDIR /app

# COPY ./package.json ./package-lock.json ./
# RUN npm install

# RUN mkdir ./src
# COPY ./src ./src

# CMD ["node", "./src/server.js"]
