FROM node:20.11

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . .

ARG PORT_ARG=8080
ENV PORT=$PORT_ARG

EXPOSE $PORT_ARG 
ENTRYPOINT [ "npm" ]
CMD ["run", "dev"]