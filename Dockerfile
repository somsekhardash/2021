FROM node:12-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --registry http://registry.npmjs.org/

COPY . .

EXPOSE 3000

CMD [ "npm", "run" , "check" ]