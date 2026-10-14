export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Thieu ma code xac thuc tu GitHub', { status: 400 });
  }

  const clientId = (env.GITHUB_CLIENT_ID || 'Ov23liYP99yUB42DHKGT').trim();
  const clientSecret = (env.GITHUB_CLIENT_SECRET || '').trim();

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'camnangxedap-cms'
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    })
  });

  const data = await response.json();
  const token = data.access_token;

  if (!token) {
    return new Response('Loi nhan token tu GitHub: ' + JSON.stringify(data) + '\nKiem tra lai GITHUB_CLIENT_SECRET tren Cloudflare!', {
      status: 400,
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    });
  }

  const html = `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:' + JSON.stringify({ token: '${token}', provider: 'github' }),
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p style="font-family:sans-serif;text-align:center;padding:20px;">Dang hoan tat dang nhap, cua so se tu dong dong...</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
