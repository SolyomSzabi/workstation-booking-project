FROM node:18-alpine

WORKDIR /etc/

COPY package*.json /etc/

RUN npm install

COPY . /etc/

RUN npm run build

CMD [ "npm", "start" ]