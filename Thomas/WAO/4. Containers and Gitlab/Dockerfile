# Stage 1: Build stage
FROM node:16 AS build-stage

WORKDIR /app
 
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the all application code
COPY . .

# Build TypeScript files
RUN npm run build

# Stage 2: Production stage
FROM node:16 as production-stage

WORKDIR /app

# Copy built files from the previous stage
COPY --from=build-stage /app/dist /app/node_modules /app/package*.json ./ 

ARG PORT_ARG=8080
ENV PORT=$PORT_ARG

EXPOSE $PORT_ARG

# To run the app without the bash shell (only one command can be used)
ENTRYPOINT ["npm"]
CMD ["start"] 