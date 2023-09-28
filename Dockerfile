FROM apline
RUN apk update
RUN apk add nodejs
RUN apk add npm

RUN mkdir /root/app
EORKFIR /root/app
COPY*/root/app

RUN npm install
EXPOSE 3333

CMD npm start
