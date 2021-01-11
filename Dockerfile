FROM node:10-slim

WORKDIR /

COPY . .

CMD ["node", "server.bundle.js"]