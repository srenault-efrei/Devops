FROM node:14 as builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY public ./public
COPY src ./src
RUN yarn install
RUN yarn build
RUN ls -la


FROM nginx:latest
COPY --from=builder /app/build/ /usr/share/nginx/html