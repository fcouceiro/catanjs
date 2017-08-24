#!/bin/bash

tsc -p tsconfig.json
../node_modules/mocha/bin/mocha bin/tests/*.js