import {Type} from "@sinclair/typebox";
import type {FormInputText} from "cruddy-forms";

const EmailSchema = Type.Object( {
  email: Type.RegExp(
    /.+@example\.com/i,
      {
        element: "input",
        hint: "Must end in @example.com",
        inputType: "email",
        placeholder: "you@example.com",
      } satisfies FormInputText,
    ),
} );

const PASS_MIN = 6;
const PasswordSchema = Type.Object( {
  password: Type.String( {
    element: "input",
    hint: `Use ${PASS_MIN} or more characters`,
    inputType: "password",
    minLength: PASS_MIN,
    placeholder: "your password",
    } satisfies FormInputText ),
} );

export const Schema = Type.Composite( [
  EmailSchema, PasswordSchema,
] );
