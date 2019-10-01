### Contents:
1. [How to install](#how-to-install)
2. [Run Commands](#run-commands)
3. [FAQ](#faq)
---
## How to install
1. Install `docker` by signing up at https://hub.docker.com/ and downloading the desktop client 
2. Install `yarn` from https://yarnpkg.com
3. Create the env file by running:
```
touch .env
```
4. Run the following command to build the containers:
```
docker-compose build
```

### Optional
- run `yarn install` if your IDE can't detect the node packages installed
---
## Run Commands
- Start:
```
docker-compose up
```
- Stop:
```
docker-compose down
```
- Start as a background process:
```
docker-compose up -d
```
- Rebuild & Start:
```
docker-compose up --build
```
---
## FAQ
- Where are the SQL scripts to setup the database?
  - in `database_init`
- Why are the files prefixed with numbers?
  - so that the SQL files can be ran in order