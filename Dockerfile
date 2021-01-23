FROM node:14

RUN yarn global add webpack

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

CMD yarn docker:watch

EXPOSE 8080 


