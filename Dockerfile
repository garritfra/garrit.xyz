FROM node

COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx

COPY dist .

COPY dist /usr/share/nginx/html

EXPOSE 80