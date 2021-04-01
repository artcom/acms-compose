# ACMS Compose

ACMS is a basic, modular, JSON-based and headless CMS.

It is centered around JSON files, which describe configuration, content and asset locations. It is composed of four modules:

| Module       | Task     | Github     |
| :------------- | :---------- | :----------- |
| ACMS Config | git repository to store JSON files  | [acms-config](https://github.com/artcom/acms-config)    |
| ACMS API | HTTP methods to modify JSON files  | [acms-api](https://github.com/artcom/acms-api)    |
| ACMS Assets | Webdav asset server to store media files  | [acms-assets](https://github.com/artcom/acms-assets)    |
| ACMS UI | Webapp to edit ACMS content with a UI | [acms-ui](https://github.com/artcom/acms-ui)    |

This repository provides a [docker-compose](./docker-compose.yml) file to setup the ACMS. It orchestrates multiple containers to create the complete ACMS setup.

## Deployment with Docker

### Requirements
* [Install docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04) (>= 20.10.5)
* [Install docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) (>= 1.28.5)

### Deployment
* `git clone https://github.com/artcom/acms-compose.git`

#### Set up UI
* download the UI static files
  ```bash
  wget https://github.com/artcom/acms-ui/releases/download/v2.5.0/acms-ui-v2.5.0.tar.gz
  tar -xvzf acms-ui-v2.5.0.tar.gz -C ui
  ```
* edit the `ui/config.json` file
  ```json
  {
    "acmsAssetsUri": "https://<hostname>/services/acms-assets",
    "acmsApiUri": "https://<hostname>/services/acms-api",
    "acmsConfigPath": "acmsConfig"
  }
  ```

#### Set up with HTTPS gateway

* create an `.env` file, available variables are listed in `.env.example`
* edit the `HOST` variable in `.env` with the host name
* edit the `ASSETS` variable in `.env` with the path to the assets directory
* edit the `CERTIFICATE` and `KEY` variables in `.env` with the SSL certificate and key locations
  * see e.g. https://letsencrypt.org/docs/certificates-for-localhost/
* generate a `dhparam.pem` file
  ```bash
  openssl dhparam -out /path/to/dhparam.pem 2048
  ```
* edit the `DHPARAM` variable in `.env` with the path to the `dhparam.pem` file
* localhost example
  ```
  HOST=localhost
  ASSETS=./assets
  CERTIFICATE=./localhost.crt
  KEY=./localhost.key
  DHPARAM=./dhparam.pem
  AUTH_FILE=./htpasswd
  ```
* create and setup with docker-compose: `docker-compose -f docker-compose.yml -f docker-compose-gateway.yml up`
  * to detach the process and run `docker-compose` in the background use option `-d`
* use the `--force-recreate` flag when any configurations in `gateway` have changed
* browse to the ACMS UI: `https://<hostname>`

### Set up basic authentication

* create a `.htpasswd` file
```bash
htpasswd -c /path/to/.htpasswd username
```
* edit the `AUTH_FILE` variable in `.env` with the location of the `.htpasswd` file
* deploy with `docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-gateway-basic-auth.yml up`

### Custom gateway

The `docker-compose.yml` file can be used in combination with a custom gateway.

### Unsafe demo with HTTP and no authentication

* download the UI static files
  ```bash
  wget https://github.com/artcom/acms-ui/releases/download/v2.5.0/acms-ui-v2.5.0.tar.gz
  tar -xvzf acms-ui-v2.5.0.tar.gz -C ui
  ```
* deploy with `docker-compose --env-file .env.demo -f docker-compose.yml -f docker-compose-gateway-http.yml up`
* the UI can be reached at http://127.0.0.1
* clone the config with ` git clone http://127.0.0.1/services/acms-config`

## Edit content

The content repository will be set up with some sample data. To modify the content structure you have to edit the JSON files manually:
* `git clone https://<hostname>/services/config`
* Edit templates and content according to the content repo conventions with your favorite editor.
* Commit and push your changes.
* Reload the ACMS.
