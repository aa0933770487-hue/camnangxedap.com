export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Thieu ma xac thuc tu GitHub', { status: 400 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'camnangxedap-cms'
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await response.json();
  const token = data.access_token;

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
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
