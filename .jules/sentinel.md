## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS vulnerability in `TalkLayout` where the `src` attribute of the `<iframe>` tag was directly mapped from `getYouTubeEmbedUrl` without validating the URL protocol. This allowed malicious payloads like `javascript:alert(1)` to be passed into the videoUrl from MDX files and execute JavaScript when the page loads or users interact with the iframe.
**Learning:** Fallbacks from regex parsing for external resources like `src` or `href` should validate the protocols to prevent XSS payloads using `javascript:` or `data:`. The native `URL` constructor (`new URL(url, base)`) is the most reliable way to validate protocols.
**Prevention:** Always parse untrusted or externally-sourced URLs through `new URL` and explicitly check `url.protocol === 'http:' || url.protocol === 'https:'` before injecting them into `src` or `href` attributes, using a safe fallback like `about:blank` for invalid URLs.
