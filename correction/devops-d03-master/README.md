# D03 - CI/CD

## Introduction

When you see `<username>` somewhere please put your GitLab username.

The goal of today's exercises is to implement a full CI / CD pipeline for a react web app.

- Each time you create a merge request test will be executed before you can merge it
- When an MR is merged on master a docker image is built and deployed to a staging server
- When you create a git tab an image is built and deployed to production

All today exercise must be pushed on git **before 05/19 12:00.**

Complete documentation for Gitlab CI configuration can be found here: https://docs.gitlab.com/ee/ci/yaml/

## Exercises

### E01 - Cloud instances

- Create 2 `DEV1-S` server named `app-prod` and `app-staging`.
- Write an Ansible inventory file in `./infra/inventory.yml`
  - This inventory should contain 2 groups (`staging` and `prod`) each one containing the correct server. 
- Write a playbook `./infra/setup-server.yml` that install docker on all hosts.
  - Don't forget to also log in to the GitLab registry

### E02 - CI Test

Write a `.gitlab-ci` that run tests on every merge-request.

> Hint: test can be run using `yarn test --watchAll=false`

### E03 - Dockerfile

Write a `Dockerfile` for this application.
Your Dockerfile should use a multi-step build to build your image.

It should look like:
```
FROM node:11 as builder

// Build your app using npm run-script build  

FROM nginx:latest
COPY --from=builder /app/build/ /usr/share/nginx/html
```

### E04 - CI Build

When a commit is made on the master branch CI should build the docker image and push it in the registry under:
`registry.efrei.yayo.fr/<username>/devops-d03/app:latest`

You should use a Gitlab CI private variable to store your docker registry password. 

### E05 - Staging CD

- Write Ansible playbook `./infra/app.yml` that run on all hosts.
- This playbook should deploy a container with the image you just build using the `docker_container`  ansible module.
- Your playbook should accept a variable `--extra-vars "version=latest"` to deploy the correct version of the image.

---

- Add a Gitlab CI job that runs after the build. This new job should execute `app.yml` playbook on staging servers
  - For this to work, you must add your ssh key as a private variable and load it inside the CI JOB ( https://docs.gitlab.com/ee/ci/ssh_keys/ )
- The playbook should only be run on staging host see `-l` ansible flag.

>  Hint: To avoid problems with SSH host key checking you should add an env variable ANSIBLE_HOST_KEY_CHECKING=False in your deploy job

### E06 - Release CD

When you create a git tag, your pipeline should
  - build and push an image `registry.efrei.yayo.fr/<username>/devops-d03/app:<git-tag>`
  - execute playbook `app.yaml` with `version=<git-tag>` on the production environment