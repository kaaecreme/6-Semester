# Stage 1: Build Stage
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Stage 2: Production Stage
FROM node:16-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --production

ARG PORT_ARG=8080
ENV PORT=$PORT_ARG

EXPOSE $PORT_ARG

ENTRYPOINT ["npm"]
CMD ["start"]
