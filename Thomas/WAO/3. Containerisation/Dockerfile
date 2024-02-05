FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ARG PORT_ARG=8080
ENV PORT=$PORT_ARG

EXPOSE $PORT_ARG

# To run the app without the bash shell (only one command can be used)
ENTRYPOINT ["npm"]
CMD ["start"]

# To use the bash shell instead of running container
# CMD ["bash"] 

