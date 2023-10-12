import type { IFormInputText } from "cruddy-forms/packages/cruddy-forms";

import { type Static, Type } from "@sinclair/typebox";

const EMAIL_MAX = 50;
const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
export const EmailSchema = Type.Object( {
    email: Type.RegExp(
        emailPattern,
        {
            element: "input",
            hint: "e.g. me@example.com",
            inputType: "email",
            maxLength: EMAIL_MAX,
            placeholder: "youremail@example.com",
        } satisfies IFormInputText,
    ),
} );

const PASSWORD_MIN = 6;
const PASSWORD_MAX = 30;
export const PasswordSchema = Type.Object( {
    password: Type.String( {
        element: "input",
        hint: `Passwords must contain ${ PASSWORD_MIN } or more characters.`,
        inputType: "password",
        maxLength: PASSWORD_MAX,
        minLength: PASSWORD_MIN,
        placeholder: "your password",
    } satisfies IFormInputText ),
} );

const USERNAME_MIN = 3;
const USERNAME_MAX = 20;
const usernamePattern = /^\S*$/; // No whitespace characters
export const UsernameSchema = Type.Object( {
    username: Type.RegExp(
        usernamePattern,
        {
            element: "input",
            endpoint: "/api/validation/username?username=",
            hint: `Usernames must contain ${ USERNAME_MIN } or more characters (no spaces).`,
            inputType: "text",
            maxLength: USERNAME_MAX,
            minLength: USERNAME_MIN,
            placeholder: "your username",
        } satisfies IFormInputText,
    ),
} );

export const SignupFormSchema = Type.Composite( [
    UsernameSchema, EmailSchema, PasswordSchema,
] );
export type UserSignupData = Static<typeof SignupFormSchema>;