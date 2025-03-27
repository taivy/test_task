# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy files
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . /app

# Expose port
EXPOSE 3000

# Start frontend
CMD ["npm", "run", "dev"]
