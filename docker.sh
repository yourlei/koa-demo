#!/bin/bash

# 创建docker容器
sudo docker run -dit \
--name node-test \
-p 7001:8080 \
-v $PWD:/var/www/node-test \
-w /var/www/node-test \
node:latest
