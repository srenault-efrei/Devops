FROM node:12
COPY index.js /app/
COPY package.json /app/
COPY package-lock.json /app/
WORKDIR /app

# Install npm
USER root
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
RUN npm install

CMD [ "node", "./index.js" ]

