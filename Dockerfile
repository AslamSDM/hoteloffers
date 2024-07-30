# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000
EXPOSE 27017

# CMD ["npm", "start"]