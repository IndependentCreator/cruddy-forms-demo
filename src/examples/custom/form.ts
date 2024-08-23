// ~/examples/custom/form.ts
import {Form} from "cruddy-forms";
import {Schema} from "~/examples/custom/schema.ts";

export function getHTMLComponent(data?: FormData) {
  const form = new Form(Schema);
  if (data) {
    form.validate(data);
  }
  return form.getHTMLComponent();
}