---
layout: default
title: "Notes on containerizing PHP applications"
date: "2023-03-03"
tags: "note, infrastructure, docker, php, 100DaysToOffload, tech"
---

I was recently tasked with building a rudimentary infrastructure for a PHP application. Coming from a Node.js-driven world where every human and their grandmother has a blog post about containerizing your application, it was very interesting to see where PHP differs to other applications.

One major gotcha for me was that PHP code is executed on **request-time**, meaning a new process is spawned for each incoming request. Most other languages have dedicated runtimes that handle incoming requests. This unique approach is very flexible and scalable, but it comes with the implication that there is a **separate webserver** that calls into the PHP interpreter when it needs to.

In Node.js (and most other languages), you can "just run the app", as demonstrated by this Dockerfile:

```dockerfile
FROM node:18.14.2-alpine3.17 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
```

PHP on the other side is rarely used on its own. Most of the time, it needs a webserver alongside it:

```dockerfile
FROM php:8.1-apache-bullseye

# <snip>

COPY . /var/www/html
WORKDIR /var/www/html

# <snip>
```

As you can see, I'm using the official PHP docker image. The PHP maintainers know that adding a webserver alongside PHP is a very common pattern, so most of the variants of the image ship with a webserver. In this example I'm using Apache, but we might as well use NGINX or some other webserver. There's also the option to use [FPM](https://www.php.net/manual/de/install.fpm.php) as a FastCGI implementation and a webserver in a **separate** container.

Grasping this took me some time, but after it clicked it made many things a lot clearer.

## More complete Dockerfile example

The Dockerfile above is meant to demonstrate how PHP applications differ from other languages. The following is a more complete example you can use to containerize your PHP application. In this case it’s a Laravel app, so your mileage may vary.

```dockerfile
FROM php:8.1-apache-bullseye

RUN apt-get clean && \
    apt-get update && \
    apt-get install --fix-missing -y \
        zip && \
    docker-php-ext-install \
        pdo \
        pdo_mysql \
        bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . /var/www/html
WORKDIR /var/www/html

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN composer install --no-dev --optimize-autoloader --no-interaction && \
    sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf && \
    php artisan config:cache && \
    php artisan view:cache && \
    php artisan route:cache && \
    php artisan storage:link && \
    chmod 777 -R /var/www/html/storage/ && \
    chown -R www-data:www-data /var/www/ && \
    a2enmod rewrite
```

---
This is post 052 of [#100DaysToOffload](https://100daystooffload.com/).
