FROM node:alpine

# Install dependencies for bcrypt and other native modules
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Rebuild bcrypt and other native modules from source
RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
