// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        isValidFormSubmission: () => boolean
    }
}