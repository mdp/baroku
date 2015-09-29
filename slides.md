name: inverse
layout: true
class: center, middle, inverse
---
#Babel on Heroku
`await yourHerokuBill`
---
layout: false
.left-column[
## Heroku in 60 seconds
]
.right-column[
Heroku is a Platform as a Service(PaaS)
- Supports numerous languages
- Relatively simple and easily customizable build process
- Very stable and mature support for Node.js
- Deploys via `git push master`
- However comes with several notable restrictions
  - Nothing can be persisted to disk between deploys
  - No access to the box (SSH)
]

---
## What Heroku does when you deploy

---
## What Heroku does when you deploy

- npm install
---
## What Heroku does when you deploy

- npm install
- Shutdown the previous version (connections will queued and held open)
---
## What Heroku does when you deploy

- npm install
- Shutdown the previous version (connections will queued and held open)
- Launch the new service
---
## What Heroku does when you deploy

- npm install
- Shutdown the previous version (connections will queued and held open)
- Launch the new service
- Connections will be routed to the new instance
---
## Basics of a Heroku Node.js Instance
---
## Basics of a Heroku Node.js Instance
### Procfile contains the basic instructions needed to run the app
```
web: node index.js
```
---
## Basics of a Heroku Node.js Instance
### package.json

- Declares which version of node you require
---
## Basics of a Heroku Node.js Instance
### package.json
```
"engines": {
    "node": "4.1.1"
}
```
---
## Basics of a Heroku Node.js Instance
### package.json

- Declares which version of node you require
- Specifies your dependencies for Heroku
---
### What you should do to help Heroku

- Move any slow build steps the 'npm install' process

---
### What you should do to help Heroku

- Move any slow build steps the 'npm install' process

```
  ...
  "scripts": {
    "start": "node index.js"
    "postinstall": "babel -d dist server"
  },
```

---
## What you should do to help Heroku

- Move any slow build steps the 'npm install' process

```
  ...
  "scripts": {
    "start": "node index.js"
    "postinstall": "babel -d dist server"
  },
```

- Ensure that the launching of the new service is fast
  - Connections are paused until the new service starts listening on the assigned port
---
# To the code

Two ways to accomplish adding Babel to your Heroku app
1. `require('babel/register')`
1. Prebuild the JavaScript files in the 'postinstall' step
---
# babel/register
index.js
```
require('babel/register');
server = require('./server');
```
---
# Prebuild
package.json
```
  "scripts": {
    "postinstall": "make build",
    "start": "node index.js"
  },
```
---
# Prebuild
Makefile
```
build: clean babel

clean:
	rm -rf build
	mkdir -p build

babel:
	babel -d build server/index.js
	rsync -av --include \*/ --include \*.json --exclude \*  ./server/ ./build/server/
	rsync -av --include \*/ --include \*.ejs --exclude \*  ./server/ ./build/server/

.PHONY: build clean
```
---
# Complete example on github

- [https://github.com/mdp/baroku](https://github.com/mdp/baroku)
- [Precompile branch](https://github.com/mdp/baroku/tree/precompile)
- ['babel/register' branch](https://github.com/mdp/baroku/tree/babel_register)
