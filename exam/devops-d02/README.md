# D02 - Ansible

## Introduction

When you see `<username>` somewhere please put your GitLab username.

All today exercise must be pushed on git before 05/18 12:00.

### Before you start please make sure that:
 - ansible is installed on your computer

    - https://docs.ansible.com/ansible/latest/installation_guide/index.html
    - ```
      $> ansible --version
      ansible 2.9.7
      ```

 - You have access to your personal Scaleway account

     - I will send you each a username and password.

## Exercises

### E01 - Let's Fork it
- Fork this repository https://gitlab.efrei.yayo.fr/devops/devops-d02 with your account.
  - Click the fork button up top.
- Clone the forked repository on your computer. All today exercises must be pushed to this repository.

### E02 - Add you ssh-key
- Go to https://console.scaleway.com and upload your ssh-key in your account.
  - https://www.scaleway.com/en/docs/configure-new-ssh-key/

### E02 - My first cloud instance
Create 3 Scaleway servers with your account.

- You should create 3 `DEV1-S` with an `Ubuntu Bionic` image.
- Leave default options for volumes and network options.
- Name your server `www01` and `www02` and `db01`

### E03 - SSH Connection
Make sure you can connect to your server using your ssh-key.

```
ssh root@X.X.X.X
```

:tada: you have created your first cloud instance.

### E04 - Ansible inventory
- Create an ansible `yaml` inventory file name `inventory.yml`
- Your inventory should have a group `www` with your server `www01` and `www02`
- Your inventory should have a group `db` with your server `db01`

To test your inventory file you should use:

```
$> ansible-inventory -i ./inventory.yml --list  
```

:point_up: This should display all your servers in their correct groups

### E05 - Ansible Variables

- For ansible to be able to connect to your servers we need to add specific variables to our inventory

- Add a variable `ansible_user` with the value `root` to all host
  - You can add variables on the `all` group directly
  - Adding this "special" variable will tell ansible to login via SSH with the user `root`

- Add a variable `ansible_python_interpreter` with the value `/usr/bin/python3` to all host
  - Adding this "special" variable will tell ansible to use python3 instead of python2.


You can test if the variables are correctly set using:

```
$> ansible-inventory -i ./inventory.yml --list -v
```

:point_up: make sure `ansible_user` is set to `root` on all hosts

### E06 - Touch

- Write an ansible playbook that writes 100 times your name in a file.
- This playbook should only run on `www` servers.
- The file should be written in `/opt/E06.txt`

Your playbook will be tested with:

```
$> ansible-playbook -i inventory.yml touch.yml
```

> Hint: use ansible template ( don't copy paste 100 times :wink: )

### E07 - Mkdir

In your inventory you should add variables such as: 
  - `mkdir: true` for all `www` host
  - `mkdir: false` for all `db` host

You can test if the variables are correctly set using:

```
$> ansible-inventory -i ./inventory.yml --list -v
```

:point_up: make sure `mkdir` is set to true and false on the correct hosts

--------

  - Create a playbook `mkdir.yml` that should be played on all hosts.
  - This playbook should create a directory `/opt/E07` if the variable `mkdir` is true.
  - If the variable is false you should make sure the directory and all its content are deleted.

Your playbook will be tested with:

```
ansible-playbook -i ./inventory.yml ./mkdir.yml
```

### E08 - Sl
Write an ansible playbook that installs the `sl` package using `apt` module on all hosts.

Your playbook will be tested with:

```
$> ansible-playbook -i ./inventory.yml sl.yml
```

To test your playbook:

- SSH to one of your server
- run `sl` command

### E09 - Install docker

- Write a playbook that installs docker using galaxy role https://galaxy.ansible.com/geerlingguy/docker.
- You should add a `requirements.yml` file so others can install all needed roles.
- In the docker playbook before using the docker role you must:
- Install `python3-pip` using `apt`
- Install `docker` and `docker-compose` `pip` package using: https://docs.ansible.com/ansible/latest/modules/pip_module.html

Your playbook will be tested using:

```
$> ansible-galaxy install -r requirements.yml <== Install all required roles
$> ansible-playbook -i ./inventory.yml docker.yml
```

### E010 - Login

In the same playbook that installs docker, add a task that login to the GitLab registry you used last yesterday. 

- Using `group_var` ansible folder you should create 2 variables that will be applied on all servers:
  - `registry_username` and `registry_password` (with your GitLab credential)

Your playbook will be tested using:

```
$> ansible-playbook -i ./inventory.yml docker.yml
```

> Hint: See docker_login ansible module

**Bonus**: Use https://docs.ansible.com/ansible/latest/user_guide/vault.html to encrypt your credentials. 

### E011 - Deploy a redis

- Write a playbook `redis.yml` that deploys a Redis container on all `db` servers.
- You should use `docker_container` ansible module to deploy your application
  - https://docs.ansible.com/ansible/latest/modules/docker_container_module.html

Your playbook will be tested using:

```
$> ansible-playbook -i ./inventory.yml redis.yml
```

To test that your playbook is working you should:

- SSH to your server and see the container running using `docker ps`
- Be able to connect to your server using `$> redis-cli -h <my_ip> -p 6379`

### E12 - Deploy a web app

Write a playbook `app.yml` that deploys this docker-compose file on all `www` hosts.
```
version: "3"
services:
  app:
    image: registry.efrei.yayo.fr/correction/devops-d01/node-count-redis:latest
    environment:
      REDIS_HOST: <your redis ip>
      REDIS_POST: 6379
    restart: always
    ports:
      - 80:8080
```

- Your playbook should copy this docker-compose file in `/opt/my-app/docker-compose.yml`.
- It should then make sure all services are up and running using `docker_compose` module.
  - https://docs.ansible.com/ansible/latest/modules/docker_compose_module.html#docker-compose-module

Your playbook will be tested using:

```
$> ansible-playbook -i ./inventory.yml redis.yml
```

To test that playbook work correctly:

- SSH to your server and see the container running using `docker-compose ps`
- Access one of your `www` server IP in your browser

### E13 - All in one

Write a playbook `all.yml` that will launch `docker`, `redis`, and `app` playbooks.

> Hint: https://docs.ansible.com/ansible/latest/modules/import_playbook_module.html



