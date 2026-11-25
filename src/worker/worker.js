/**
 * Workers entrypoint.
 *
 * Privacy rule: this Worker never reads or stores request bodies.
 * Images are processed only in the browser. Static files are served by
 * Cloudflare's asset layer; this Worker only handles fallback responses
 * and adds a few headers to responses it generates.
 */

const COMMON_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function applyHeaders(response, requestUrl) {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(COMMON_HEADERS)) {
    if (!headers.has(key)) headers.set(key, value);
  }

  if (requestUrl.hostname.endsWith(".workers.dev")) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);

    // Never inspect or forward request bodies. Images stay in the browser.
    try {
      const assetResponse = await env.ASSETS.fetch(request);
      return applyHeaders(assetResponse, requestUrl);
    } catch (error) {
      const body = [
        "<!doctype html>",
        "<html lang=\"en\"><head><meta charset=\"utf-8\">",
        "<title>Page not found | Toolorial</title>",
        "<meta name=\"robots\" content=\"noindex\"></head>",
        "<body><main><h1>Page not found</h1>",
        "<p>The page you requested does not exist.</p>",
        "<p><a href=\"/\">Back to home</a></p></main></body></html>",
      ].join("");

      return new Response(body, {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...COMMON_HEADERS,
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }
  },
};
