all: install test

install:
	npm install

test:
	npm run test

.PHONY: test install
