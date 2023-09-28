FROM alpine

RUN apk update -y
RUN apk add nodejs npm

RUN mkdir /root/app
WORKDIR zamz/amazon-app/src/index.js

COPY package.json /root/app/

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
