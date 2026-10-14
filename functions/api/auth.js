export async function onRequestGet(context) {
  const { env, request } = context;
  const clientId = (env.GITHUB_CLIENT_ID || 'Ov23liYP99yUB42DHKGT').trim();
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/callback`;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${authUrl}">
  <title>Dang chuyen huong sang GitHub...</title>
</head>
<body style="font-family:sans-serif;text-align:center;padding:50px;">
  <p>Dang chuyen huong sang GitHub de xac thuc...</p>
  <p><a href="${authUrl}" style="color:#2563eb;font-weight:bold;">Bam vao day neu trang khong tu chuyen</a></p>
  <script>window.location.href = "${authUrl}";</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Location': authUrl
    }
  });
}
