# Build State 
FROM node:26-alpine AS builder

# Working Dir 
WORKDIR /app

# Copy package files first to install Dependencies
COPY package*.json ./

# Install Dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy Source Code
COPY . .

# Production Stage
FROM node:26-alpine AS production

# APP Directory
WORKDIR /app

# Create non-root user 
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 

# Copy Built application from builder stage
COPY --from=builder --chown=nextjs:node.js /app /app

# Switch to non-root user
USER nodejs

# Expose Port
EXPOSE 8080

# Basic Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require['http'].get('http://localhost:8080', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" 

# Start application
CMD ["node", "src/app.js"]