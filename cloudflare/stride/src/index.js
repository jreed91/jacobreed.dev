// Serves the Stride landing page at https://runwithstride.app.
//
// The page itself lives in public/stride/ so jacobreed.dev/stride keeps
// serving the same file. Its asset URLs start with /stride/img/, so this
// Worker maps those onto the assets folder (which is public/stride itself).
// Privacy and support stay on jacobreed.dev, because App Store Connect
// links there.

const MAIN_SITE = 'https://jacobreed.dev';

const OFFSITE = {
  '/privacy': '/stride/privacy',
  '/stride/privacy': '/stride/privacy',
  '/support': '/stride/support',
  '/stride/support': '/stride/support'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (OFFSITE[path]) {
      return Response.redirect(MAIN_SITE + OFFSITE[path], 301);
    }
    if (path === '/stride' || path === '/index.html') {
      return Response.redirect(new URL('/', url).toString(), 301);
    }

    let assetPath;
    if (path === '/') {
      assetPath = '/';
    } else if (url.pathname.startsWith('/stride/img/')) {
      assetPath = url.pathname.slice('/stride'.length);
    } else if (url.pathname.startsWith('/img/')) {
      assetPath = url.pathname;
    } else {
      return Response.redirect(new URL('/', url).toString(), 302);
    }

    const assetUrl = new URL(assetPath, url);
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    const withHeaders = new Response(response.body, response);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      withHeaders.headers.set(key, value);
    }
    return withHeaders;
  }
};
