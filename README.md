# Git JSON CMS

This repository provides a `docker-compose` to setup the Git JSON CMS. It creates multiple containers to manage and serve the git content via GIT/HTTP, asset files via WebDav and the [CMS frontend](https://github.com/artcom/git-json-cms-frontend) to easily modify the configuration.

More CMS related details can be found in the [git-json-cms-frontend](https://github.com/artcom/git-json-cms-frontend) repository.

Check the [docker-compose](./docker-compose.yml) file for container setup related details.

## Deployment with Docker

* Requirement: Docker >=v17.12
* `HOST=<hostname> docker-compose -f docker-compose.yml up`
* Open http://<hostname>

## Edit content
The content repository will be set up with some sample data. To replace/alter the content structure you have to edit the JSON files manually:
* `git clone http://<hostname>:83`
* Edit templates and content according to the content repo conventions with your favorite editor.
* Commit and push your changes.
* Reload the CMS.
