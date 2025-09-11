FROM node:24-alpine3.21

RUN mkdir -p /usr/app

WORKDIR /usr/app/

COPY package*.json /usr/app/

RUN npm install

COPY ./app/ /usr/app/

EXPOSE 8080

CMD ["node", "app.js"]