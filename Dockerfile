# vim:set ft=Dockerfile:

FROM node:4.4.0

RUN \
  apt-get update && \
  apt-get install -y zsh less --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN zsh -c 'git clone --recursive https://github.com/garbin/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"; setopt EXTENDED_GLOB;  for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}";  done;  chsh -s /bin/zsh'

ARG APP_HOME

RUN npm install -g npm@3.9.5

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

VOLUME $APP_HOME/node_modules

ADD package.json $APP_HOME
