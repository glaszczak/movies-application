FROM node:15.4 as movies-service

WORKDIR /app/movies-service

COPY package*.json /app/movies-service
COPY yarn.lock /app/movies-service

RUN yarn install

COPY . /app/movies-service

CMD ["yarn", "start:dev"]
