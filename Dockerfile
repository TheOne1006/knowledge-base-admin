FROM node:18-alpine
WORKDIR /usr/src/app/
COPY ./package.json /usr/src/app/package.json
COPY ./yarn.lock /usr/src/app/yarn.lock
RUN yarn install
COPY ./ ./
RUN yarn build
