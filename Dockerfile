FROM node:13-alpine

COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=0 /app/out /usr/share/nginx/html
EXPOSE 80