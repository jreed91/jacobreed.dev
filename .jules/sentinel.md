## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS via unsafe Iframe URI]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would return arbitrary strings for unrecognized URLs, allowing `javascript:` or `data:` URIs to be passed to an `iframe`'s `src` attribute.
**Learning:** Returning unvalidated fallback URLs for external links or iframes is unsafe, as `iframe` elements can execute scripts if given `javascript:` URIs, leading to XSS if the source (like MDX frontmatter) is compromised or untrusted.
**Prevention:** Always enforce strict protocol validation (e.g. `http://`, `https://`, or root-relative `/`) on URLs before using them in DOM elements that load resources or navigate, falling back to a safe URI like `about:blank`.
