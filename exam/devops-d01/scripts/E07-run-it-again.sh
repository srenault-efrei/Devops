#!/bin/bash

docker tag registry.efrei.yayo.fr/srenault-efrei/devops-d01/hello:latest registry.efrei.yayo.fr
docker push registry.efrei.yayo.fr/srenault-efrei/devops-d01/hello
docker run  -e "HELLO_WHAT=srenault-efrei" -it --init --rm -p 1234:8080 registry.efrei.yayo.fr/srenault-efrei/devops-d01/hello:latest 
