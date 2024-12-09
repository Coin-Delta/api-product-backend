FROM node:18-alpine

# Install dependencies
# RUN apk update

# Set environment variables

WORKDIR /app

COPY package*.json ./
COPY server.js ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "run", "prod" ]