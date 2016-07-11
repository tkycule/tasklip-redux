# vim:set ft=Dockerfile:

FROM node:4.4.0

ARG APP_HOME

RUN npm install -g npm@3.9.5

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

VOLUME $APP_HOME/node_modules

ADD package.json $APP_HOME
