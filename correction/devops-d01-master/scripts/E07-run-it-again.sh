#!/bin/bash

docker run --rm --init -p 1234:8080 -e HELLO_WHAT=correction registry.efrei.yayo.fr/correction/devops-d01/hello:latest