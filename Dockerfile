FROM node:latest

WORKDIR /usr/src/blog-project

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]

