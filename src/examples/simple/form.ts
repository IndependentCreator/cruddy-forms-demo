// ~/examples/basic/form.ts
import {Form} from "cruddy-forms";
import {Schema} from "~/examples/simple/schema.ts";

export function formHTML() {
  return new Form(Schema).getHTML();
}
