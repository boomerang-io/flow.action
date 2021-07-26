# Boomerang Flow GitHub Action

This action will run a workflow in Boomerang Flow

## Inputs

| Input       | Description                                                                  | Default                                       | Required |
| ----------- | ---------------------------------------------------------------------------- | --------------------------------------------- | -------- |
| URL         | The Boomerang Flow event URL.                                                | `https://<host>/flow/services/listener/event` | true     |
| Token       | The security token as part of your workflow                                  |                                               | true     |
| Workflow ID | The ID of the workflow that you want to run.                                 |                                               | true     |
| Topic       | This is entered in the Workflow configuration when you enable a Custom event |                                               | true     |
| Payload     | The JSON payload you would like sent.                                        |                                               | false    |

Find more information at our [documentation](https://www.useboomerang.io/docs/boomerang-flow/architecture/eventing-architecture)

## How to set up your Workflow

In your Boomerang Flow instance, for the Workflow you wish to run, navigate to the Edit Workflow > Configuration > Triggers and enable the Event trigger.
