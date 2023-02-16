FROM node

WORKDIR /usr/app

COPY package.json ./
RUN npm i -g @nestjs/cli


COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]