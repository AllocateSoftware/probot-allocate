FROM node:9.11.1

RUN apt-get install -y \
    python \
    make \
    tzdata

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

ADD . /usr/src/app/

RUN cd /usr/src/app && \
  npm install && \
  npm cache clear --force

EXPOSE 3000

# start app
CMD ["npm", "start"]