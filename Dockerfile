FROM alpine

RUN apk update -y
RUN apk add nodejs npm

RUN mkdir /root/app
WORKDIR /root/app

COPY package.json /root/app/

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
