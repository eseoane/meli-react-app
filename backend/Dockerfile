FROM node:8
RUN mkdir -p /backend
WORKDIR /backend
COPY package.json /backend/
COPY package-lock.json /backend/
RUN npm install --production
COPY . /backend
CMD node app.js
