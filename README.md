# Boomerang Flow GitHub Action

This action will run a workflow in Boomerang Flow

## Inputs

| Input       | Description                                                                                                      | Default                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| URL         | The Boomerang Flow event URL. https://www.useboomerang.io/docs/boomerang-flow/architecture/eventing-architecture | `https://<host>/flow/services/listener/event` |
| Token       | The security token as part of your workflow                                                                      |                                               |
| Workflow ID | The ID of the workflow that you want to run.                                                                     |                                               |
| Topic       | This is entered in the Workflow configuration when you enable a Custom event                                     |                                               |
| Payload     | _Optional._ The JSON payload you would like sent.                                                                |

## How to set up your Workflow

In your Boomerang Flow instance, for the Workflow you wish to run, navigate to the Edit Workflow > Configuration > Triggers and enable the Event trigger.
