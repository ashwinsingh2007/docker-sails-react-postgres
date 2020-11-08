# Specify a base image
FROM node:12.13.0-alpine AS alpine

WORKDIR /app

COPY package.json package.json 
RUN npm install && npm cache clean --force && npm install sails -g
COPY . .
EXPOSE 1337
# Default command
CMD ["npm", "start"]