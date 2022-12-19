FROM node:v18.11.0-alpine

RUN apk --no-cache add yarn

WORKDIR /app
COPY ./src /app/src
COPY ./.eslintrc.json /app/
COPY ./.prettierrc /app/
COPY ./package.json /app/
COPY ./tsconfig.json /app/
COPY ./webpack.config.js /app/
COPY ./yarn.lock /app/

RUN yarn install
ENTRYPOINT ["yarn", "run"]