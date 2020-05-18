#!/bin/bash

cd ./node-count

if [ "$1" == "build" ]
then
  docker build -t registry.efrei.yayo.fr/correction/devops-d01/count:latest .
else
  docker run --rm --init -v "$(pwd)/data.json:/app/data.json" -p 1234:8080 registry.efrei.yayo.fr/correction/devops-d01/count:latest
fi
