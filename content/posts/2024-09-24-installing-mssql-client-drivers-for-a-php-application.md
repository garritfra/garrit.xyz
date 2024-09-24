---
title: "Installing MSSQL Client Drivers for a PHP Application"
date: "2024-09-24"
tags: "guide, note, web, tech, programming, php"
---

I just had the pleasure (*cough*) to connect an [MSSQL](https://de.wikipedia.org/wiki/Microsoft_SQL_Server) database to a [Laravel](https://laravel.com/) application at work. Because the process was *super* tedious, I wanted to quickly jot this down so I will never have to go through this again.

## Our setup

We're building a Laravel application with [DDEV](https://ddev.com/). DDEV essentially moves all development tools into Docker containers and adds some nice features like local database management.

## The process

Laravel comes with the boilerplate to use MSSQL out of the box. In your app, just set the database config to use `sqlsrv`:

```php
    'connections' => [
        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            // 'encrypt' => env('DB_ENCRYPT', 'yes'),
            // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
        ],
    ],
```

You will see errors when starting your app, because you need to install the corresponding drivers first. Instead of adding them through [Composer](https://getcomposer.org/) (a widely adopted package manager for PHP), you have to install the ODBC drivers **through the system package manager**, because Microsoft doesn't maintain a PHP package. Furthermore, you also have to install the driver repository because **Microsoft doesn't even maintain packages for the major Linux distributions**. In our setup with DDEV, this has to be done by amending the Dockerfile used for the application container. Create a file at `.ddev/web-build/Dockerfile` and add the following contents:

```dockerfile
# https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage
# https://stackoverflow.com/questions/58086933/how-to-install-the-sql-server-php-drivers-in-ddev-local#new-answer
ARG BASE_IMAGE
FROM $BASE_IMAGE

RUN npm install --global forever
RUN echo "Built on $(date)" > /build-date.txt

# RUN curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
# RUN curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list

RUN curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
RUN curl https://packages.microsoft.com/config/debian/12/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update
RUN apt-get --allow-downgrades -y install libssl-dev
RUN apt-get -y update && yes | ACCEPT_EULA=Y apt-get -y install php8.3-dev php-pear unixodbc-dev htop
RUN ACCEPT_EULA=Y apt-get -y install msodbcsql18 mssql-tools18
RUN sudo pecl channel-update pecl.php.net
RUN sudo pecl install sqlsrv
RUN sudo pecl install pdo_sqlsrv

RUN sudo printf "; priority=20\nextension=sqlsrv.so\n" > /etc/php/8.3/mods-available/sqlsrv.ini
RUN sudo printf "; priority=30\nextension=pdo_sqlsrv.so\n" > /etc/php/8.3/mods-available/pdo_sqlsrv.ini
RUN sudo phpenmod -v 8.3 -s cli sqlsrv pdo_sqlsrv
RUN sudo phpenmod -v 8.3 -s fpm sqlsrv pdo_sqlsrv
RUN sudo phpenmod -v 8.3 -s apache2 sqlsrv pdo_sqlsrv

RUN sudo printf "; priority=20\nextension=sqlsrv.so\n" > /etc/php/8.3/mods-available/sqlsrv.ini
RUN sudo printf "; priority=30\nextension=pdo_sqlsrv.so\n" > /etc/php/8.3/mods-available/pdo_sqlsrv.ini
RUN sudo phpenmod -v 8.3 -s cli sqlsrv pdo_sqlsrv
RUN sudo phpenmod -v 8.3 -s fpm sqlsrv pdo_sqlsrv
RUN sudo phpenmod -v 8.3 -s apache2 sqlsrv pdo_sqlsrv

RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
```

If you're reading this in the future and Microsoft may have released a new version of the ODBC drivers, you may have to follow the new [installation instructions from their documentation](https://learn.microsoft.com/de-de/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver16&tabs=debian18-install%2Calpine17-install%2Cdebian8-install%2Credhat7-13-install%2Crhel7-offline#18). It took me a while to realize that I couldn't install version 17 of the driver because I was using the installation instructions for version 18. They are apparently incompatible with each other.

I hope that you'll never have to touch the shithole that is MSSQL, but if you do, I hope that this guide will be of value to you.
