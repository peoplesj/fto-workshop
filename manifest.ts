import { Manifest } from "deno-slack-sdk/mod.ts";
import CreateFTOWorkflow from "./workflows/request_fto_workflow.ts";

// Manage app settings
export default Manifest({
  name: "FTO Requester",
  description: "Request and manage flexible time off",
  icon: "assets/default_new_app_icon.png",
  workflows: [CreateFTOWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
