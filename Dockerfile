# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.17.1
FROM node:${NODE_VERSION}-slim as base

# Main app directory
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as client_build
WORKDIR /app

# Install node modules
COPY --link ./client/package-lock.json ./client/package.json ./client/
# Copy the rest of the client files
COPY --link ./client ./client

WORKDIR /app/client

RUN npm ci --include=dev

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Throw-away build stage to reduce size of final image
FROM base as server_build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base as final

# Copy built client application
COPY --from=client_build app/client/dist/ ./client/dist/

# Copy built application
COPY --from=server_build /app ./

# Start the server by default, this can be overwritten at runtime
EXPOSE 3001
ENV PORT 3001

CMD [ "npm", "run", "start" ]
