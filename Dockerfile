FROM node:13
WORKDIR /app
COPY . .
RUN rm -rf api.config.json
RUN mv api.config.docker.json api.config.json
RUN npm install
EXPOSE 80
CMD ["npm", "start"]