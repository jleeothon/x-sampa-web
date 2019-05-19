FROM nginx:1.16.0-alpine
RUN apk add --no-cache nodejs=10.14.2-r0 yarn=1.12.3-r0
WORKDIR /app
COPY package.json yarn.lock ./
RUN \
yarn install
COPY . ./
RUN \
yarn build
ENTRYPOINT ["yarn", "serve"]
