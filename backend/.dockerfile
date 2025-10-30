FROM node:20-alpine

WORKDIR /www

COPY yarn.lock package*.json ./

RUN yarn install

COPY . .

RUN yarn global add @nestjs/cli

EXPOSE 3000

CMD ["yarn", "start:dev"]