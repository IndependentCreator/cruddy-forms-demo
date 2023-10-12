import type { APIContext, MiddlewareNext } from "astro";

export async function onRequest( context: APIContext, next: MiddlewareNext<Response> ) {
    context.locals.isValidFormSubmission = () => {
        if ( context.request.method !== "POST" ) {
            return false;
        }
        const originHeader = context.request.headers.get( "Origin" );
        if ( !originHeader || originHeader !== new URL( context.request.url ).origin ) {
            return false;
        }
        return true;
    };
    return next();
}