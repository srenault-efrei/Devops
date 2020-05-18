# D01 - Docker

## Introduction

When you see `<username>` somewhere please put your GitLab username.

All today exercise must be pushed on git before 05/17 12:00.

:warning: **Read carefully:**

All the bash script you write will be placed in the `scripts` folder.
When your script will be tested they will all be launch from the root of the repo like this. `./scripts/xxxxxxx.sh`.
Be careful if you need to use `cd` or relative path.

### Before you start please make sure:
 - That docker is installed on your computer
    - https://docs.docker.com/engine/install/
 - That you have an SSH key pair on your computer
    - https://www.scaleway.com/en/docs/configure-new-ssh-key/ (You can ignore the last part for now)

## Exercises

### E00 - Gitlab
 - Create a GitLab account on https://gitlab.efrei.yayo.fr/users/sign_in. You'll have to turn in all your exercises on this GitLab.
    - Please use your real name so I can know who is who
    - Please use your Efrei email address
    - **Don't use** your favorite password in some exercise I will be able to read it.
 - Add your SSH key to your GitLab account
    - https://gitlab.efrei.yayo.fr/profile/keys

If everything is set up correctly you should be able to do

```
$> ssh git@gitlab.efrei.yayo.fr -p 21
PTY allocation request failed on channel 0
Welcome to GitLab, @<username>!
Connection to gitlab.efrei.yayo.fr closed.
```

### E01 - Let's Fork it

- Fork this repository https://gitlab.efrei.yayo.fr/devops/devops-d01 with your account.
  - Click the fork button up top.
- Clone the forked repository on your computer. All today exercises must be pushed to this repository.

### E02 - Registry
Write a bash script that allows you to log in to the `registry.efrei.yayo.fr` docker registry.

- Your script **should not** prompt a password.
- Your login and password are the same as Gitlab

**Files to push**:

 - `./scripts/E02-registry.sh`

> Hint: A bash script example is provided. You can run it using `./scripts/E00-example.sh`

### E03 - My first Dockerfile
In the `node-hello` folder you will find a simple Node.js application.
The goal of this exercise is to write a `Dockerfile` that built a docker image for this application.

Official Dockerfile doc: https://docs.docker.com/engine/reference/builder/

**Files to push**:

 - `./node-hello/Dockerfile`

> To test your Dockerfile have a look at E04 and E05 

### E04 - Build it
Write a bash script that will build the image based on the Dockerfile you write on `E03`.

- The image you build must be tagged `registry.efrei.yayo.fr/<username>/devops-d01/hello:latest`
- Your image must be based in `node:12`

**Files to push**:

 - `./scripts/E04-build-it.sh`

If your image is built correctly you should be able to see it by doing:

```
$> docker images
REPOSITORY                                           TAG                 IMAGE ID
registry.efrei.yayo.fr/correction/devops-d01/hello   latest              d591757bb45e        
```

### E05 - Run it
Write a bash script that will run the image you just built.
When your script is running, you should be able to do this in another terminal window:

```
$> curl localhost:1234
Hello World !
```

The container you create when you run your image should be destroyed when the script ends. (by hitting `Ctrl-C`)

To list all containers:

```
$> docker ps -a
CONTAINER ID        IMAGE       COMMAND                  CREATED             STATUS   PORTS
```

:point_up: the list should  be empty

> The `-a` flag tell `docker ps` to also list stopped containers

**Files to push**:

 - `./scripts/E05-run-it.sh`

### E06 - Push it
Write a bash script that pushes the image you build to the `registry.efrei.yayo.fr` docker registry.

After executing your script correctly you should be able to do this:
```
$> docker pull registry.efrei.yayo.fr/<username>/devops-d01/hello:latest
latest: registry.efrei.yayo.fr/<username>/devops-d01/hello
Digest: sha256:xxxxxxxxxxxxxxxxxxxx
Status: Image is up to date for registry.efrei.yayo.fr/<username>/devops-d01/hello:latest
```

**Files to push**:
 - `./scripts/E06-push-it.sh`

### E07 - Run it again
Do the same as `E05` but this time when your script is running, you should be able to do this in another terminal window:

```
$> curl localhost:1234
Hello <username> ! 
```

**Files to push**:
 - `./scripts/E07-run-it-again.sh`

### E08 - Language do not matter
In the `go-hello` folder you will find a simple Golang application.
The goal of this exercise is:

- write `Dockerfile` that builds an image for this application.
- write a bash script that will build this image using the `Dokerfile`.
  - The image must be tagged `registry.efrei.yayo.fr/<username>/devops-d01/hello:latest`

If you build your image correctly you should be able to use scripts from `E05` and `E07`with the same result.

**Files to push**:
 - `./go-hello/Dockerfile`
 - `./scripts/E08-language-do-not-matter.sh`

```
Hint: 
$> go build main.go <= Build application and create a ./main executable file
$> ./main <= Run the application
```

### E09 - Don't lose it
The `node-count` folder contains a simple Node.js application that counts the number of visitors on a page.
The total number of visits is written in a file `data.json`

- Write a `Dockerfile` for this application.
- Write a script so  that:

```
$> ./scripts/E09-dont-lose-it.sh build ### Should build an image
$> ./scripts/E09-dont-lose-it.sh run ### Should run the image
```

- Image must be tagged  `registry.efrei.yayo.fr/<username>/devops-d01/count:latest`
- When the run script end the container should no longer exist (remember `E05`)
- If I execute the `./scripts/E09-dont-lose-it.sh run` multiple time the counter **should not** be reset  

**Files to push**:

 - `./scripts/E09-dont-loose-it.sh`

> Hint: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only

### E10 - Compose it up
The `node-count-redis` folder contains a simple Node.js application that counts the number of visitors on a page.
The total number of visits is stored in a Redis server.

- Write a `Dockerfile` for this application.
- Write a docker-compose file for `node-count-redis` application.
- Your docker-compose that allow:

```
$> cd node-count-redis
$> docker-compose build
$> docker-compose up -d
$> curl localhost:1234
You are visitor number 1 !
$> docker-compose down -v
$> docker-compose up -d
$> curl localhost:1234
You are visitor number 2 !
$> docker-compose down -v
```
The Redis server should be started with your docker-compose file

**Files to push**:

 - `./node-count-redis/docker-compose.yml`

## Bonus

### B01 - Make it tiny
Update the Dockerfile of `E08` to make the image as small as possible.
I got `4.81MB` can you do better?
Of course, the image should still work