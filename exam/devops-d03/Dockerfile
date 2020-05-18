FROM node:11 as builder
WORKDIR /app
COPY package.json package-lock.json  ./
COPY src ./src
COPY public ./public
RUN npm install
RUN npm run-script build  
FROM nginx:latest
COPY --from=builder /app/build/ /usr/share/nginx/html
