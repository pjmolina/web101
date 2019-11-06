FROM node:12-alpine
LABEL AUTHOR pjmolina.metadev.pro

RUN mkdir /app
WORKDIR /app

ADD package.json /app/
RUN npm install
ADD . /app

ENV PORT=8000
EXPOSE 8000

CMD ["npm", "start"]