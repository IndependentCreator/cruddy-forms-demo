// ~/examples/custom/form.ts
import {Form} from "cruddy-forms";
import {Schema} from "~/examples/password/schema.ts";

export function getHTMLComponent1(data?: FormData) {
  const form = new Form(Schema, "Submit", {passwordHideSVG: "", passwordShowSVG: ""});
  if (data) {
    form.validate(data);
  }
  return form.getHTMLComponent();
}

export function getHTMLComponent2(data?: FormData) {
  const form = new Form(Schema);
  if (data) {
    form.validate(data);
  }
  return form.getHTMLComponent();
}

export function getHTMLComponent3(data?: FormData) {
  const passwordShowSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-check" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" /><path d="M15 19l2 2l4 -4" /></svg>`;
  const passwordHideSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-closed" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" /><path d="M3 15l2.5 -3.8" /><path d="M21 14.976l-2.492 -3.776" /><path d="M9 17l.5 -4" /><path d="M15 17l-.5 -4" /></svg>`;
  const form = new Form(Schema, "Submit", {passwordHideSVG, passwordShowSVG});
  if (data) {
    form.validate(data);
  }
  return form.getHTMLComponent();
}