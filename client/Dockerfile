FROM node:16.19.0-alpine

RUN apk --no-cache add yarn

WORKDIR /app
COPY ./src /app/src
COPY ./public /app/public
COPY ./.prettierrc /app/
COPY ./package.json /app/
COPY ./tsconfig.json /app/
COPY ./yarn.lock /app/

RUN yarn install
ENTRYPOINT ["npm", "start"]