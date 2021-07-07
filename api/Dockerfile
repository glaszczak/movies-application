FROM node:15.4 as api

WORKDIR /app/api

COPY package*.json /app/api
COPY yarn.lock /app/api

RUN yarn install

COPY . /app/api

CMD ["yarn", "start:dev"]
