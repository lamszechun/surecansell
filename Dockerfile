# use the latest official NodeJS image as the base image
FROM node:10.16-buster

# set the working directory to /app
RUN mkdir -p /app
WORKDIR /app

# install our app dependencies
# we're copying and installing dependencies first to make use of docker's caching
COPY package*.json /app/

RUN yarn install

# then we copy the rest of the files over
COPY . /app

# expore port 3000 because it the default port for expressJS
EXPOSE 3000

# start our application server
CMD ["yarn", "nodemon"]