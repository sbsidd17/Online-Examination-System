FROM node:18
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3213
CMD ["node", "index.js"]
