#!/bin/bash

# 创建docker容器
sudo docker run -dit \
--name koa-demo \
-p 7001:8080 \
-v $PWD:/var/www/koa-demo \
-w /var/www/koa-demo \
node:latest
