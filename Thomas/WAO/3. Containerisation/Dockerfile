FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run tscone

# Not needed atm i think (found in example)
#ADD public.tar.gz .

ARG PORT_ARG=8080
ENV PORT=$PORT_ARG

EXPOSE $PORT_ARG
ENTRYPOINT ["npm"]
CMD ["start"]

