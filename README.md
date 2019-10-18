### Contents:
1. [How to install](#how-to-install)
2. [Git Commands](#git-commands)
3. [Updating a forked repository](#updating-a-forked-repository)
4. [Troubleshooting](#troubleshooting)
---
## How to install
1. Install `docker` by signing up at https://hub.docker.com/ and downloading the desktop client 
2. Install `yarn` from https://yarnpkg.com
3. Open terminal in project folder
4. Run the following command to build the containers:
   ```
   docker-compose build
   ```
5. Run the following command to start the containers:
   ```
   docker-compose up
   ```
6. You're all set to start working!
### Optional
- run `yarn install` if your IDE can't detect the node packages installed
---
## Git Commands
- Create a new branch before working
```
git checkout development
git pull
git checkout -b < insert branch name here >
```
- Adding your changes
```
git add -A
git commit -m < description of changes >
git push
```
- If the push has errors:
```
git push --set-upstream origin example_branch
```
---
## Updating a forked repository
1. Initial Setup (if you've done this already, skip this part):
   ```
   git remote add upstream git@github.com:bluub/surecansell.git
   git checkout upstream/development
   git checkout development
   ```
2. Get the latest changes from the original repository
   ```
   git fetch upstream
   git checkout upstream/development
   git pull
   git checkout development
   ```
3. Rebase the changes onto the forked repository's branch
   ```
   git rebase upstream/development
   ```
4. If there are no problems, skip to step 5
 
   ELSE, run this command and do NOT update from the original repository:
   ```
   git rebase --abort
   ```
5. Update your branch
   ```
   git push -f
   ```
---
## Troubleshooting
- Rebuild the database
```
docker-compose rm db
docker-compose build
```
- Rebuild everything from scratch
```
docker-compose build --no-cache
```