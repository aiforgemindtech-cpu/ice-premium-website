/**
 * Completes the GitHub OAuth handshake and hands the token back to Decap CMS.
 *
 * Decap listens for a `postMessage` from the popup in a specific string shape,
 * so the response is an HTML page that posts that message and closes itself.
 * The token is never written to the page URL or to storage.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  const fail = (reason: string) =>
    new Response(page("error", { message: reason }), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

  if (!clientId || !clientSecret) return fail("Content editor is not configured.");
  if (!code) return fail("GitHub did not return an authorization code.");

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
      signal: AbortSignal.timeout(20000),
    });

    const data = (await res.json()) as {
      access_token?: string;
      error_description?: string;
    };

    if (!data.access_token) {
      return fail(data.error_description || "GitHub declined the token request.");
    }

    return new Response(page("success", { token: data.access_token }), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return fail("Could not reach GitHub. Please try again.");
  }
}

/** Decap expects exactly `authorization:github:<status>:<json>`. */
function page(status: "success" | "error", payload: Record<string, string>) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Signing in…</title></head>
  <body style="margin:0;background:#070d1f;color:#d4af37;font-family:system-ui,sans-serif">
    <p style="padding:2rem">Signing you in…</p>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        function send(e) {
          if (!window.opener) return;
          window.opener.postMessage(message, e && e.origin ? e.origin : "*");
        }
        window.addEventListener("message", send, false);
        send();
        setTimeout(function () { window.close(); }, 1200);
      })();
    </script>
  </body>
</html>`;
}
