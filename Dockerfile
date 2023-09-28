FROM alpine

RUN apk update -y
RUN apk add nodejs npm

RUN mkdir /root/app
WORKDIR amazon-backend/server.js

COPY package.json /root/app/

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
