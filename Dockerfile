FROM node:10.13-alpine

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm install
ADD . /app
RUN npm run docs

EXPOSE 3000

CMD ["npm", "start"]
