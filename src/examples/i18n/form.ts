// ~/examples/basic/form.ts
import {Form} from "cruddy-forms";
import {Schema} from "~/examples/i18n/schema.ts";

export function formHTML(lang: string, data?: FormData) {
  const buttonLabel = lang === "es" ? "Enviar" : "Submit";
  const form = new Form(Schema, buttonLabel);
  if (data) {
    form.validate(data);
  }
  return form.getHTML(undefined, lang);
}
