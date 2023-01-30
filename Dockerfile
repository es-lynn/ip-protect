FROM node:16-slim AS node-modules-builder

RUN apt-get update -y \
  && apt-get install -y openssl

WORKDIR /usr/src/app

COPY . ./

RUN yarn install
RUN yarn setup
RUN yarn build:all

FROM node:16-slim
WORKDIR /usr/src/app

COPY --from=node-modules-builder /usr/src/app/backend ./modules/backend

EXPOSE 8080
CMD ["node", "/backend/dist/main.js"]
