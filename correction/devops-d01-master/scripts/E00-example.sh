#!/bin/bash

echo "This is a simple bash script example."
echo "If I do an ls, it should list files that are on the root of the git repo"
ls -l

if [[ "$1" == "hello" ]]
then
    echo "Hello to you too"
fi
