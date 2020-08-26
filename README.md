`git clone --recursive https://github.com/artcom/git-json-cms.git`

# Git JSON CMS

A web frontend to edit content in JSON files inside a Git repo. Content is structured as a tree of entities that can have fields of different types and children, which are entities by themselves. MOre information are located in the [git-json-cms-frontend repository](https://github.com/artcom/git-json-cms-frontend).

## Deployment with Docker

* Requirement: Docker >=v17.12
* `HOST=<HOST> docker-compose -f docker-compose.yml up`
* Open [http://localhost](http://localhost/)

## Edit content
The content repository will be set up with some sample data. To customize content and templates you have to edit the files manually first.
* `git clone http://[host]:83`
* Edit templates and content according to the content repo conventions with your favorite editor.
* Commit and push your changes.
* Reload the CMS.
