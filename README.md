# Git JSON CMS

This repository provides a `docker-compose` to setup the Git JSON CMS. It creates multiple containers to manage and serve the git content via GIT/HTTP, asset files via WebDav and the [CMS frontend](https://github.com/artcom/git-json-cms-frontend) to easily modify the configuration.

More CMS related details can be found in the [git-json-cms-frontend](https://github.com/artcom/git-json-cms-frontend) repository.

Check the [docker-compose](./docker-compose.yml) file for container setup related details.

## Deployment with Docker

### Requirements
* [Install docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
* [Install docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
* Create an assets directory (on _Docker For Mac_ you need to add the directory via [File Sharing](https://docs.docker.com/docker-for-mac/))

### Deployment
* clone this repository: `git clone --recurse-submodules https://github.com/artcom/git-json-cms.git`
* download the frontend static files
  ```bash
  wget https://github.com/artcom/git-json-cms-frontend/releases/download/config_file-1.0.0/git-json-cms-frontend-config_file-1.0.0.tar.gz
  tar -xvzf git-json-cms-frontend-config_file-1.0.0.tar.gz -C frontend
  ```
* edit the `frontend/config.json` file
  ```json
  {
    "assetServerUri": "http://<hostname>/assets",
    "configServerUri": "http://<hostname>/git-json-api",
    "cmsConfigPath": "cmsConfig"
  }
  ```
* create an `.env` file, available variables are listed in `.env.example`
* edit the `HOST` variable in `.env` with the host name
* edit the `ASSETS` variable in `.env` with the path to the assets directory
* edit the `CERTIFICATE` and `KEY` variables in `.env` with the SSL certificate and key locations
* create and setup with docker-compose: `docker-compose -f docker-compose.yml up`
  * to detach the process and run `docker-compose` in the background use option `-d`
* use the `--force-recreate` flag when any configurations in `gateway` have changed
* browse to the CMS frontend: `http://<hostname>`

## Edit content
The content repository will be set up with some sample data. To replace/alter the content structure you have to edit the JSON files manually:
* `git clone http://<hostname>:83`
* Edit templates and content according to the content repo conventions with your favorite editor.
* Commit and push your changes.
* Reload the CMS.
