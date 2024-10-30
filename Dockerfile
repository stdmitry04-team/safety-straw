# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-build

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ .

# Build the frontend application
RUN npm run build

# Stage 2: Build the backend
FROM node:18-alpine AS backend-build

# Set working directory for the backend
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ .

# Stage 3: Final image
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production

# Copy built frontend from the previous stage
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Copy backend files from the previous stage
COPY --from=backend-build /app/backend .

# Expose the port your app runs on
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"] # Adjust this based on your entry point for the backend
