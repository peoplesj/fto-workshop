import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { RequestFTO } from "../functions/request_fto_function.ts";

// Step 0. Define the workflow!
const CreateFTOWorkflow = DefineWorkflow({
  callback_id: "request_fto_workflow",
  title: "Send FTO requests",
  description: "Request approval for some time away",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity", "channel"],
  },
});

// Step 1. Collect input using the built-in OpenForm function
const ftoRequestData = CreateFTOWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Request time off",
    description: "You deserve the break!",
    interactivity: CreateFTOWorkflow.inputs.interactivity,
    submit_label: "Send request",
    fields: {
      elements: [{
        name: "manager",
        title: "Manager",
        type: Schema.slack.types.user_id,
      }, {
        name: "start_date",
        title: "Start date",
        type: Schema.slack.types.date,
      }, {
        name: "end_date",
        title: "End date",
        type: Schema.slack.types.date,
      }, {
        name: "reason",
        title: "Reason",
        description: "Is there a special occasion?",
        type: Schema.types.string,
        long: true,
      }],
      required: ["manager", "start_date", "end_date"],
    },
  },
);

// Step 2. Send the request to the manager using a custom function
CreateFTOWorkflow.addStep(
  RequestFTO,
  {
    manager: ftoRequestData.outputs.fields.manager,
    employee: CreateFTOWorkflow.inputs.interactivity.interactor.id,
    start_date: ftoRequestData.outputs.fields.start_date,
    end_date: ftoRequestData.outputs.fields.end_date,
    reason: ftoRequestData.outputs.fields.reason,
  },
);
export default CreateFTOWorkflow;