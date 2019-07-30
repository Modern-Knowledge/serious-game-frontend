FROM node:12.6.0

COPY . /www/app

RUN npm install -g cordova ionic
RUN npm install -g yarn
RUN npm install -g gulp

WORKDIR /www/app
RUN npm install

ENTRYPOINT ["ionic"]
CMD ["serve", "8100", "--address", "0.0.0.0"]