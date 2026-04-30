# Base image
FROM node:20-alpine

# App directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose port
EXPOSE 5005

# Default command (server)
CMD ["npm", "run", "dev"]