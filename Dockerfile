FROM node:21.0.0

WORKDIR /app
COPY ./ /app
RUN npm install -g nodemon
RUN npm install
CMD [ "npm","run","dev" ]