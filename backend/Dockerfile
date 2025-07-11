# Use Node 22 base image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files and install deps
COPY backend/package*.json ./
RUN npm install

# Copy app source
COPY backend/. ./

# Expose backend port
EXPOSE 5000

# Set environment variables if needed
ENV NODE_ENV=production

# Start the server
CMD [ "node", "server.js" ]
