#! Stage 1: Build stage
FROM node:20.11 AS builder

# Creates workdir called app_build
WORKDIR /app_build

# Copies package-lock.json and package.json into workdir
COPY package*.json ./

# Installs dependencies and npm ci ignores development dependencies
RUN npm ci

# Copies the rest of the code
COPY . .

# Builds typescript to javascript files
RUN npm run tsc

#! Stage 2: Runtime stage
# node-alpine is a smaller docker image which contains a node.js runtime env
# Linux alpine is a small linux distro
FROM node:20.11-alpine

# Creates workdir called app_run
WORKDIR /app_run

# Copies all package.json, package-lock.json and dist
COPY --from=builder /app_build/package*.json ./
COPY --from=builder /app_build/dist ./dist

# Set the ports to 8080
ARG PORT_ARG=8080
ENV PORT=$PORT_ARG

# Exposes the port
EXPOSE $PORT_ARG

# Installing only the production dependencies
RUN npm ci --production

# Runs the code
CMD ["node", "dist/index.js"]
