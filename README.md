# Git JSON CMS

A web frontend to edit content in JSON files inside a Git repo. Content is structured as a tree of entities that can have fields of different types and children, which are entities by themselves.

These field types are currently supported:
* `string`
* `markdown`
* `enum`
* `image`

## Content Repo Conventions

The content repo is served by the [Git JSON API](https://github.com/artcom/git-json-api) and needs to adhere to some conventions for the CMS to work correctly:


### `schema.json`

On the top level, there must be a file named `schema.json` with the following content:

```json
{
  "files": [
    "config",
    "content/**/index",
    "templates/*"
  ]
}
```

See the [Git JSON API Documentation](https://github.com/artcom/git-json-api#schemajson) for details.


### `config.json`

On the top level, there must be a file named `config.json`. It must contain a JSON object with an array of languages specified under the `languages` key, e.g.

```json
{
  "languages": [
    "de",
    "en"
  ]
}
```

Languages are specified by their [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.

### `templates/`

Entities must have a template defining which fields and what kinds of children they can have. This is done in a file named after the entity, in the `templates` directory.

E.g., the template for a `book` entity would be defined in `templates/book.json` and might look as follows:

```json
{
  "fields": [
    {
      "name": "author",
      "type": "string"
    },
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "cover",
      "type": "enum",
      "values": [
        {
          "name": "Hardcover",
          "value": "hard"
        },
        {
          "name": "Paperback",
          "value": "paper"
        }
      ]
    }
  ],
  "children": [
    "preface",
    "chapter",
    "appendix"
  ]
}
```

### `content/`

The actual content resides in the `content` directory on the top level. It contains the root entity in a file named `index.json` (see below) and a subdirectory for every child of the entity.


### `content/**/index.json`

The `index.json` files contain a JSON object with the fields of the entity. Additionally, the entity template is defined under the `template` key.

For the `book` example above, `content/index.json` might look like this:

```json
{
  "template": "book",
  "author": "Scott Chacon",
  "title": "Pro Git",
  "cover": "paper"
}
```


## Configuration

The app can be configured using query string parameters:

* `assetServer` URL to a WebDAV server that stores image assets
* `gitJsonApi` URL to the [Git JSON API](https://github.com/artcom/git-json-api) serving the content repo


## Build

### Production

* `npm install`
* `npm run build`
* Find the build result in the `public` directory and serve it using any static web server.

### Development

* `npm install`
* `npm run watch`
* Open [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)
