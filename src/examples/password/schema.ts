// ~/examples/basic/schema.ts
import {Type} from "@sinclair/typebox";
import type {FormInputText} from "cruddy-forms";

const PASS_MIN = 6;
export const Schema = Type.Object( {
  password: Type.String( {
    element: "input",
    hint: `Use ${PASS_MIN} or more characters`,
    inputType: "password",
    minLength: PASS_MIN,
    placeholder: "your password",
    } satisfies FormInputText ),
} );
