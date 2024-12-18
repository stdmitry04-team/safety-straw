# Stage 1: Build the Frontend
FROM node:18-alpine AS frontend-build

ARG VITE_BASE_URL
ARG VITE_STRIPE_PUBLIC
ARG VITE_REG_URL

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ ./

#set env vars
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_STRIPE_PUBLIC=$VITE_STRIPE_PUBLIC
ENV VITE_REG_URL=$VITE_REG_URL

# Build the frontend for production
RUN npm run build

# Stage 2: Setup the Backend
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./

# Copy the built frontend from the previous stage into the backend's 'public' directory
COPY --from=frontend-build /app/frontend/dist ./public

# Set the environment to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]