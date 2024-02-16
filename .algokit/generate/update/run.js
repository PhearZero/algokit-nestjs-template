#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const os = require('os')

const pkg = require(path.resolve(process.cwd(),'package.json'))
const deltas = require(path.resolve(__dirname, 'deltas.json'))
const {spawn} = require("node:child_process");

function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) Object.assign(source[key], mergeDeep(target[key], source[key]))
  }

  Object.assign(target || {}, source)
  return target
}

fs.writeFileSync('package.json', JSON.stringify(mergeDeep(pkg, deltas), null, 2))
