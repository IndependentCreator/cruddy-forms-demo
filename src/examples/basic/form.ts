// ~/examples/basic/form.ts
import {Form} from "cruddy-forms";
import {Schema} from "~/examples/basic/schema.ts";

export const formHTML = new Form(Schema).getHTML();
