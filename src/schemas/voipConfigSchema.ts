
import { UISchema } from "@/lib/types";

export const voipConfigSchema: UISchema = {
  title: "New VOIP Configuration",
  breadcrumb: [
    { label: "VOIP Configuration", url: "/voip-configuration" },
    { label: "New VOIP Configuration" }
  ],
  fields: [
    {
      type: "html",
      name: "header",
      htmlContent: "<div class='bg-blue-50 p-4 rounded-md mb-6'><p class='text-blue-600 font-medium'>Configure your VOIP settings below. All fields marked with <span class='text-red-500'>*</span> are required.</p></div>",
      cssClass: "w-full"
    },
    {
      type: "input",
      name: "name",
      label: "Name",
      placeholder: "Give this VOIP Configuration a name, e.g. the phone number(s) associated with it.",
      required: true
    },
    {
      type: "divider",
      name: "section-divider",
      cssClass: "my-6"
    },
    {
      type: "input",
      name: "did",
      label: "DID",
      placeholder: "e.g. my_agent@customer_id.voip.parloa.com",
      required: true,
      description: "The SIP URI your agent will be available when sending a SIP INVITE to Parloa"
    },
    {
      type: "html",
      name: "info-box",
      htmlContent: "<div class='bg-amber-50 border border-amber-200 p-3 rounded-md'><h4 class='text-amber-700 font-medium mb-2'>Important Security Information</h4><p class='text-amber-700 text-sm'>Please ensure that you whitelist the correct IP addresses to maintain secure connections.</p></div>",
      cssClass: "mt-4 mb-4"
    },
    {
      type: "ipList",
      name: "whitelistedIps",
      label: "Whitelisted IPs",
      required: true,
      description: "A list of IP addresses or IP ranges from which SIP INVITEs will be accepted"
    },
    {
      type: "space",
      name: "6",
      cssClass: "my-4"
    },
    {
      type: "select",
      name: "assignedAgent",
      label: "Assigned Agent & Label",
      placeholder: "Not assigned to any agent and label",
      description: "Select the Agent and label to assign this VOIP configuration to.",
      options: [
        { value: "none", label: "Not assigned to any agent and label" },
        { value: "agent1", label: "Customer Support (Main Line)" },
        { value: "agent2", label: "Sales Team" },
        { value: "agent3", label: "Technical Support" }
      ]
    },
    {
      type: "select",
      name: "timezone",
      label: "Time zone",
      placeholder: "No time zone assigned",
      description: "Select a time zone to associate with this VOIP Configuration.",
      options: [
        { value: "none", label: "No time zone assigned" },
        { value: "utc", label: "UTC" },
        { value: "est", label: "Eastern Standard Time (EST)" },
        { value: "cet", label: "Central European Time (CET)" },
        { value: "pst", label: "Pacific Standard Time (PST)" }
      ]
    }
  ],
  actions: [
    {
      type: "submit",
      label: "Create",
      actionType: "primary"
    }
  ]
};
