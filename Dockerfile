FROM node

COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80