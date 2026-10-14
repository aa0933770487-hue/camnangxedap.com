export async function onRequestGet(context) {
  const { env, request } = context;
  const clientId = env.GITHUB_CLIENT_ID;
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/callback`;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
  return Response.redirect(authUrl, 302);
}
