# Stage 1: Build the application
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add configuration to handle React Router
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
