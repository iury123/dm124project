#!/bin/bash
echo "Dockerization started..."
sudo docker stop api
sudo docker rm api
sudo docker rmi -f $(docker images -q)
sudo docker build --no-cache -t api-rest .
sudo docker run --name api -t -p 3000:3000 --restart always api-rest
echo "Docker running..."
