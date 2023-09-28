FROM alpine

RUN apk update -y
RUN apk add nodejs npm

RUN mkdir /root/app
WORKDIR /root/app

COPY package.json /root/app/package.json

RUN npm install

EXPOSE 3333

CMD ["npm", "start"]
