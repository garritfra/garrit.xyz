#!/bin/bash

echo "installing dependencies"
npm i

echo "building site"
npm run build

echo "copying to apache folder"
sudo cp -r ./dist/* /var/www/html

echo "stopping apache2"
sudo service apache2 stop

echo "starting apache2"
sudo service apache2 start
