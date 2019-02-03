FROM node

COPY . /app
WORKDIR /app
RUN npm install && npm run build

EXPOSE 80

CMD [ "npm", "start" ]