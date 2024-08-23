import {Type} from "@sinclair/typebox";
import type {FormInputText} from "cruddy-forms";

const EmailSchema = Type.Object( {
  email: Type.RegExp(
    /.+@example\.com/i,
      {
        element: "input",
        hint: {"en": "Must end in @example.com",
               "es": "Debe terminar en @example.com"},
        inputType: "email",
        label: {"en": "Email",
                "es": "Correo electrónico"},
        placeholder: {"en": "you@example.com",
                      "es": "tu@example.com"},
      } satisfies FormInputText,
    ),
} );

const PASS_MIN = 6;
const PasswordSchema = Type.Object( {
  password: Type.String( {
    element: "input",
    hint: {"en": `Use ${PASS_MIN} or more characters`,
           "es": `Usa ${PASS_MIN} o más caracteres`},
    inputType: "password",
    label: {"en": "Password",
            "es": "Contraseña"},
    minLength: PASS_MIN,
    placeholder: {"en": "your password",
                  "es": "tu contraseña"},
    } satisfies FormInputText ),
} );

export const Schema = Type.Composite( [
  EmailSchema, PasswordSchema,
] );