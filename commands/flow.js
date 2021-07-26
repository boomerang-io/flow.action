"use strict";

const { log, utils } = require("@boomerang-io/worker-core");
const fetch = require("node-fetch");
const { CloudEvent, HTTP } = require("cloudevents");

async function run() {
  log.sys("Hello from Boomerang Flow");

  const taskProps = utils.resolveInputParameters();
  const { url, token, workflowId, topic, payload } = taskProps;

  //validate mandatory fields
  if (!url) {
    log.err("No url has been specified");
    process.exit(1);
  }
  if (!token) {
    log.err("No token has been specified");
    process.exit(1);
  }
  if (!workflowId) {
    log.err("No workflowId has been specified");
    process.exit(1);
  }

  const event = new CloudEvent({
    subject: "/" + workflowId + "/" + topic,
    type: "io.boomerang.eventing.custom",
    source: "/github/action",
    datacontenttype: "application/json",
    data: JSON.stringify(payload),
  });

  const binaryMessage = HTTP.structured(event);

  const requestHeaders = { ...binaryMessage.headers, ...{ Authorization: token } };

  log.sys("Headers:", JSON.stringify(requestHeaders));

  const requestConfig = {
    method: "PUT",
    body: binaryMessage.body,
    headers: requestHeaders,
  };

  log.debug("requestConfig:");
  log.debug(requestConfig);

  try {
    await fetch(url, requestConfig);
    log.good("Event was succesfully sent!");
  } catch (e) {
    log.err(e);
    process.exit(1);
  }
}

module.exports = {
  run,
};
