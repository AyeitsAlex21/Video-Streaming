# Dockerfile for React frontend

# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container's work directory
COPY . .

# Build the app
RUN npm run build

# Install serve to run the app
RUN npm install -g serve

# Command to serve the app on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000 to be accessible externally
EXPOSE 3000
