# Dockerfile for React frontend using Nginx

# Use an official Node runtime as a parent image to build the React app
FROM node:14 as builder

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

# Use nginx to serve the static content
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Copy a custom nginx config if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to be accessible externally
EXPOSE 80

# Start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]
