import { Trigger } from "deno-slack-api/types.ts";
import RequestFTO from "../workflows/request_fto_workflow.ts";

// Define the link trigger for the request workflow
const requestFTOTrigger: Trigger<typeof RequestFTO.definition> = {
  type: "shortcut",
  name: "Request time off",
  description: "Request approval from your manager for time off",
  workflow: "#/workflows/request_fto_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default requestFTOTrigger;
