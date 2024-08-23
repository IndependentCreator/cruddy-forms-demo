// ~/examples/defaults/form.ts
import {Form} from "cruddy-forms";
import {Schema} from "~/examples/basic/schema.ts";

export function getHTML(data?: FormData) {
  const form = new Form(Schema, "Submit", {action: "#form"});
  let defaults = {}
  if (data) {
    form.validate(data);
    defaults = {email: data.get("email"), username: data.get("username")}
  }
  return form.getHTML(defaults);
}
