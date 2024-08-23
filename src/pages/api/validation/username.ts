import type { APIContext } from "astro";
import { validateUsername } from "~/examples/custom/username";

export async function GET( context: APIContext ) {
    console.log(context.url);
    return validateUsername( context.url.searchParams );
}
