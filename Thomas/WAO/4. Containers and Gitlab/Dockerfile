# Stage 1: Build stage
FROM node:20 AS build-stage

WORKDIR /app
 
COPY package.json .
COPY package-lock.json .

# Install dependencies
# only install packages listed in the dependencies section of the package.json file, 
# omitting packages listed in the devDependencies section.
# npm ci automatically ignores devdependencies
RUN npm ci
 
COPY . .

# Build TypeScript files (convert to js files in dist/)
RUN npm run build


# Stage 2: Production stage
FROM node:20-alpine as production-stage

WORKDIR /app
 
COPY --from=build-stage /app/dist ./
COPY --from=build-stage /app/package*.json ./

RUN npm ci --omit=dev

ARG PORT_ARG=8080
ENV PORT=$PORT_ARG
EXPOSE $PORT_ARG
  
CMD ["node", "index.js"]
