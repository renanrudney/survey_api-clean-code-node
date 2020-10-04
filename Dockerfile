FROM node:12
WORKDIR /usr/src/survey-clean-node-api
COPY ./package.json .
RUN npm install --only=prod