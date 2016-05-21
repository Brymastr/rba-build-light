FROM node:onbuild

WORKDIR /src
ADD . /src

RUN npm install

EXPOSE 80

CMD ["node", "index.js"]