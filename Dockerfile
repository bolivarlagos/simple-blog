FROM node:latest

COPY . /blog-project

RUN npm install -g npm@7.5.0

CMD node /blog-project/app.js
