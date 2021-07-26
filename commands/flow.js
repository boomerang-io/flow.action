"use strict";

const { log } = require("@boomerang-io/worker-core");

function run() {
  log.sys("Hello from Boomerang Flow");
}

module.exports = {
  run,
};
