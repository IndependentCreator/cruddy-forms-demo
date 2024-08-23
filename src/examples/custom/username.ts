// ~examples/custom/validation/username.ts
function response(message: string, status: number) {
  return new Response(JSON.stringify({message}), {status});
}
export const usersDatabase = ["pele", "messi"];
export function validateUsername(params: URLSearchParams) {
  console.log(params);
  const username = params.get("username");
  if (!username) {
    return response("Error: username required", 400);
  }
  if (usersDatabase.includes(username.toLowerCase())) {
    return response("Sorry, username taken", 422);
  }
  return response("", 200); 
}
