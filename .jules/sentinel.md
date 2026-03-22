## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-21 - [Fix Iframe Src XSS]
**Vulnerability:** XSS vulnerability where user-provided URLs in `app/db/talks.ts` were passed unmodified to an `iframe` `src` attribute in `app/components/TalkLayout.tsx` if they didn't match a YouTube URL regex.
**Learning:** `iframe` `src` attributes are vulnerable to `javascript:` and `data:` URIs. If an attacker controls the data (e.g. via frontmatter or database input), they can execute arbitrary JavaScript in the context of the page by providing a `javascript:` URL.
**Prevention:** Always validate protocols for URLs dynamically injected into `iframe` `src` attributes or external links. Only allow `http://`, `https://`, or root-relative `/` URLs, and fallback to `about:blank` for invalid inputs.
