FROM node:10-alpine

COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80