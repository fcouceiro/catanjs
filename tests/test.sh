#!/bin/bash

tsc -p tests/tsconfig.json
./node_modules/mocha/bin/mocha tests/bin/tests/*.js