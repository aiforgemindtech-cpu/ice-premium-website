import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/content";

/**
 * Starts the GitHub OAuth handshake for the content editor at /admin.
 *
 * Decap CMS is git-based, so publishing a post is a commit. That needs a GitHub
 * token, and GitHub will not issue one to a static page — hence this pair of
 * routes. Netlify hosts an equivalent proxy for its own users; on Cloudflare we
 * host it ourselves, which also means no third party sits in the auth path.
 */
export function GET(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "Content editor is not configured yet. See 'Publishing blog posts' in the README.",
      { status: 503, headers: { "Content-Type": "text/plain" } },
    );
  }

  const origin = new URL(request.url).origin || siteConfig.site.url;
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/cms/callback`);
  // `repo` is required because publishing writes content files to the repo.
  authorize.searchParams.set("scope", "repo,user");
  authorize.searchParams.set("state", crypto.randomUUID());

  return NextResponse.redirect(authorize.toString());
}
