FROM node:10-alpine AS alpine

WORKDIR /app

COPY package.json package.json 

## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN rm -rf node_modules
RUN npm install && npm cache clean --force && npm install
# Copy the contents of the project to the image
COPY . .
# Run 'npm start' when the container starts.
CMD ["npm", "run", "start"]