# Use a Node.js base image
FROM node:20-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build TypeScript code
COPY . .
RUN npm run build

# Start the application
CMD ["node", "build/index.js"]

