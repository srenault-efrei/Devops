#!/bin/bash

docker build -t registry.efrei.yayo.fr/srenault-efrei/devops-d01/count:latest node-count/.

docker run  -it --init --rm -p 1234:8080 -v $(pwd)/node-count/data.json:/data.json  registry.efrei.yayo.fr/srenault-efrei/devops-d01/count:latest

