# Use the Bun official image
FROM oven/bun:latest

# Create and change to the app directory.
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/
COPY backend/bun.lock ./backend/

# Install backend dependencies
RUN cd backend && bun install --frozen-lockfile

# Copy frontend package files
COPY frontend/package*.json ./frontend/
COPY frontend/bun.lock ./frontend/

# Install frontend dependencies
RUN cd frontend && bun install --frozen-lockfile

# Copy frontend source
COPY frontend/ ./frontend/

# Build frontend
RUN cd frontend && bun run build

# Copy backend source
COPY backend/ ./backend/

# Build backend
RUN cd backend && bun run build

# Copy built frontend to backend dist
RUN cp -r frontend/dist/frontend/browser backend/dist/client

# Expose port
EXPOSE 3000

# Run the backend
CMD ["bun", "run", "backend/dist/main.js"]
