#!/bin/bash

echo "installing dependencies"
npm i

echo "building site"
npm run build

echo "copying to apache folder"
cp -r ./dist /var/www

echo "stopping apache2""
service apache2 stop

echo "starting apache2"
service apache2 start
