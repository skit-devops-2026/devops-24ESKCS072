# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Build production bundle
RUN npm run build

# Production Runtime Stage
FROM nginx:alpine

# Copy built artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy dynamic nginx template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Default port for local runtime and cloud environments (e.g. Render)
ENV PORT=10000

EXPOSE 10000

# Substitute environment variables into Nginx configuration and start server
CMD ["sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
