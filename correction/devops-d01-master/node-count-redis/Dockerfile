FROM node:12
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY index.js /app/
ENTRYPOINT ["node", "index.js" ]
