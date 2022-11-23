FROM node:16-alpine3.16

COPY $PWD /home/node/app

WORKDIR /home/node/app

VOLUME ["/data"]

RUN npm install

RUN npm run build

EXPOSE 80

CMD ["/bin/sh", "-c", "npm run start:prod"]