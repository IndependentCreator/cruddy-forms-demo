// ~/examples/basic/schema.ts
import {Type} from "@sinclair/typebox";
import type {FormInputCheckbox, FormInputText, FormTextArea} from "cruddy-forms";

export const UsernameSchema = Type.Object( {
  username: Type.RegExp(
    /^\S*$/, // No whitespace
      {
        element: "input",
        hint: "Username may not contain spaces",
        inputType: "text",
        maxLength: 8,
        placeholder: "your username",
      } satisfies FormInputText,
    ),
} );

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

const CommentSchema = Type.Object( {
    comment: Type.String( {
        element: "textarea",
        inputType: "text",
        maxLength: 50,
        minLength: 10,
        rows: 5,
        } satisfies FormTextArea )
} );

const SignupSchema = Type.Object( {
    signup: Type.Boolean( {
        checked: false,
        element: "input",
        inputType: "checkbox",
        label: "Add me to the list!",
    } satisfies FormInputCheckbox ),

} );

export const Schema = Type.Composite( [
  UsernameSchema, EmailSchema, PasswordSchema, SignupSchema, CommentSchema
] );
