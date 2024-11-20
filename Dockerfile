# Stage 1: Build the React app
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with nginx
FROM nginx:alpine

# Copy the build output from the previous stage to the nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html
# COPY  --from=build /app/package*.json ./
#COPY --from=build /app /usr/share/nginx/html
# Expose port 80 to serve the app
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]