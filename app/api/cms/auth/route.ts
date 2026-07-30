import { siteConfig } from "@/lib/content";

const REPO = "aiforgemindtech-cpu/ice-premium-website";

/**
 * Sign-in for the content editor at /admin.
 *
 * Decap opens this in a popup and waits for a `postMessage` carrying a GitHub
 * token. The usual way to supply one is a GitHub OAuth App plus a server-side
 * client secret — an extra registration step, and it puts this server in the
 * auth path.
 *
 * Instead the owner pastes a fine-grained token scoped to this one repository.
 * It is read in the browser and posted straight back to Decap: the token is
 * never sent to this server, never logged, and never stored anywhere but the
 * editor's own session. Fewer moving parts and a much smaller blast radius
 * than a broad OAuth grant.
 */
export function GET() {
  const tokenUrl =
    "https://github.com/settings/personal-access-tokens/new?" +
    new URLSearchParams({
      name: "ICE-Premium content editor",
      description: "Lets the site owner publish content from icepremiumltd.com/admin",
      target_name: REPO.split("/")[0],
    });

  return new Response(page(tokenUrl), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function page(tokenUrl: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Sign in · ${siteConfig.company.name}</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #070d1f; color: #fff; padding: 1.5rem;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif; line-height: 1.6;
  }
  .card { width: 100%; max-width: 30rem; }
  h1 { font-size: 1.4rem; margin: 0 0 .4rem; }
  p { color: rgba(255,255,255,.7); margin: 0 0 1rem; font-size: .95rem; }
  ol { color: rgba(255,255,255,.7); font-size: .95rem; padding-left: 1.2rem; margin: 0 0 1.25rem; }
  li { margin-bottom: .5rem; }
  a { color: #d4af37; }
  label { display: block; font-size: .75rem; letter-spacing: .12em;
    text-transform: uppercase; color: #d4af37; margin-bottom: .5rem; }
  input {
    width: 100%; padding: .85rem 1rem; border-radius: .6rem; font-size: .95rem;
    background: #0d1a3a; border: 1px solid rgba(255,255,255,.15); color: #fff;
    font-family: ui-monospace, monospace;
  }
  input:focus { outline: 2px solid #d4af37; outline-offset: 2px; border-color: transparent; }
  button {
    width: 100%; margin-top: .9rem; padding: .9rem 1rem; border: 0; cursor: pointer;
    border-radius: 9999px; font-size: 1rem; font-weight: 600; color: #070d1f;
    background: linear-gradient(90deg, #d4af37, #e6c659);
  }
  button:disabled { opacity: .5; cursor: not-allowed; }
  .err { color: #ff9a9a; font-size: .9rem; margin-top: .75rem; min-height: 1.2rem; }
  .note { font-size: .8rem; color: rgba(255,255,255,.5); margin-top: 1.25rem; }
</style>
</head>
<body>
  <main class="card">
    <h1>Sign in to the content editor</h1>
    <p>This needs a GitHub token so your changes can be saved to the site.</p>
    <ol>
      <li><a href="${tokenUrl}" target="_blank" rel="noopener">Create a token</a> — set
        <strong>Repository access</strong> to <em>ice-premium-website</em>, and under
        <strong>Permissions → Repository</strong> set <strong>Contents</strong> to
        <em>Read and write</em>.</li>
      <li>Copy it and paste it below.</li>
    </ol>

    <form id="f" autocomplete="off">
      <label for="t">GitHub token</label>
      <input id="t" name="t" type="password" placeholder="github_pat_… or ghp_…"
             required spellcheck="false" autocomplete="off" />
      <button type="submit" id="b">Sign in</button>
      <p class="err" id="e" role="alert"></p>
    </form>

    <p class="note">
      Your token is checked directly against GitHub from this page and handed to the
      editor. It is never sent to our server and never stored on it. Revoke it any
      time from your GitHub settings.
    </p>
  </main>

<script>
(function () {
  var form = document.getElementById("f");
  var input = document.getElementById("t");
  var button = document.getElementById("b");
  var err = document.getElementById("e");

  function send(token) {
    var msg = "authorization:github:success:" + JSON.stringify({ token: token, provider: "github" });
    function post(e) {
      if (!window.opener) return;
      window.opener.postMessage(msg, e && e.origin ? e.origin : "*");
    }
    window.addEventListener("message", post, false);
    post();
    setTimeout(function () { window.close(); }, 800);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var token = input.value.trim();
    if (!token) return;

    button.disabled = true;
    button.textContent = "Checking…";
    err.textContent = "";

    // Verify the token can actually write to this repo before handing it over,
    // so a wrong-scope token fails here with a clear message rather than
    // failing later on save with a confusing one.
    fetch("https://api.github.com/repos/${REPO}", {
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" }
    })
      .then(function (res) {
        if (res.status === 401) throw new Error("That token was not accepted by GitHub.");
        if (res.status === 404) throw new Error("Token has no access to this repository.");
        if (!res.ok) throw new Error("GitHub returned " + res.status + ".");
        return res.json();
      })
      .then(function (repo) {
        if (!repo.permissions || !repo.permissions.push) {
          throw new Error("Token is read-only. Set Contents to Read and write.");
        }
        button.textContent = "Signed in";
        send(token);
      })
      .catch(function (e) {
        err.textContent = e.message;
        button.disabled = false;
        button.textContent = "Sign in";
      });
  });
})();
</script>
</body>
</html>`;
}
