FROM node:18.17.1-alpine3.18 as build

WORKDIR /app

COPY --chown=node:node . /app/

RUN npm run build

FROM node:18.17.1-alpine3.18

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]