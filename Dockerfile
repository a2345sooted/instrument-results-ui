# -------- Build stage --------
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# -------- Runtime stage --------
FROM nginx:alpine

# SPA routing config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Angular browser build output
COPY --from=build /app/dist/instrument-results-ui/browser /usr/share/nginx/html

EXPOSE 80
