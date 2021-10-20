"use strict";

const { log } = require("@boomerang-io/worker-core");
const fetch = require("node-fetch");
const { CloudEvent, HTTP } = require("cloudevents");

/**
 *
 * @param {} input - check to see if the parameter is not empty, then parse before sending to API
 *
 */
function checkForJson(input) {
  if (input && typeof input === "string" && input !== '""') {
    try {
      return JSON.parse(input);
    } catch (err) {
      log.err("JSON was unable to be parsed");
      process.exit(1);
    }
  }
  return undefined;
}

async function run() {
  log.sys("Hello from Boomerang Flow");

  const {
    FLOW_URL: url,
    FLOW_TOKEN: token,
    FLOW_WORKFLOW_ID: workflowId,
    FLOW_TOPIC: topic,
    FLOW_PAYLOAD: payload,
  } = process.env;

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
  
  const eventData = checkForJson(payload) : payload ? JSON.stringify(payload);

  const event = new CloudEvent({
    subject: "/" + workflowId + "/" + topic,
    type: "io.boomerang.eventing.custom",
    source: "/github/action",
    datacontenttype: "application/json",
    data: eventData,
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
