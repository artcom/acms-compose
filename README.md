# ACMS Compose

ACMS is a simple, modular, headless CMS.

It is centered around JSON files which contain the content including asset links as well as templates defining the content structure. It is composed of four modules:

| Module       | Task     | Github     |
| :------------- | :---------- | :----------- |
| ACMS Config | git repository to store JSON files  | [acms-config](https://github.com/artcom/acms-config)    |
| ACMS API | HTTP methods to modify JSON files  | [acms-api](https://github.com/artcom/acms-api)    |
| ACMS Assets | Webdav asset server to store media files  | [acms-assets](https://github.com/artcom/acms-assets)    |
| ACMS UI | Webapp to edit ACMS content with a UI | [acms-ui](https://github.com/artcom/acms-ui)    |

This repository provides [docker-compose](./docker-compose.yml) files to setup the ACMS. It orchestrates the services above in containers as well as an optional `gateway` to access them.

## Requirements
* [docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04) (>= 20.10.5)
* [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) (>= 1.28.5)

## Install the ACMS UI web page
* download the UI static files inside the `acms-compose` folder
  ```bash
  wget https://github.com/artcom/acms-ui/releases/download/v2.7.1/acms-ui-v2.7.1.tar.gz
  tar -xvzf acms-ui-v2.7.1.tar.gz -C ui
  ```
* edit the `ui/config.json` file
  ```json
  {
    "acmsAssetsUri": "https://<hostname>/services/acms-assets",
    "acmsApiUri": "https://<hostname>/services/acms-api",
    "acmsConfigPath": "acmsConfig"
  }
  ```

## Start Services

###  HTTP Gateway

* edit the `.env.http.example` file
* deploy with
```bash
docker-compose --env-file .env.http.example -f docker-compose.yml -f docker-compose-gateway-http.yml up
```
* browse to the ACMS UI: `http://127.0.0.1`

### HTTPS Gateway

* create an [SSL certificate and key](https://letsencrypt.org/docs/certificates-for-localhost)  
```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
* create a `dhparam.pem` file
  ```bash
  openssl dhparam -out dhparam.pem 2048
  ```
* update the `.env.https.example` file
* deploy with
```bash
docker-compose --env-file .env.https.example -f docker-compose.yml -f docker-compose-gateway-https.yml up
```
* browse to the ACMS UI: `https://localhost`

### Basic Authentication

* create a `.htpasswd` file
```bash
htpasswd -c .htpasswd username
```
* edit the `AUTH_FILE` variable in `.env.https.example`
* deploy with `docker-compose --env-file .env.https.example -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-gateway-basic-auth.yml up`

## CORS
* to support cross origin requests uncomment the `CORS` section in `gateway/nginx.conf`

## Edit Content

The content repository will be setup with some sample data. To modify the content structure you can clone the config repository:
```bash
git clone https://localhost/services/acms-config
```
* Edit the template/content files according to the [documentation](https://github.com/artcom/acms-ui)
* Commit and push your changes
* Reload the ACMS UI

## Troubleshooting
* use the `--force-recreate` flag when any configurations in `gateway` have changed