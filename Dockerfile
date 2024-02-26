FROM node:21-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g nodemon
COPY . /app
CMD ["node", "src/server.js"]
EXPOSE 80