## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS vulnerability where untrusted user input from MDX frontmatter (e.g. `videoUrl`) was directly used as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`.
**Learning:** React/Next.js does not natively sanitize URLs passed to `iframe` `src` attributes. A malicious user or compromised CMS could inject `javascript:` or `data:` URIs, allowing arbitrary JavaScript execution in the context of the user's browser.
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) before injecting them into `iframe` `src` or `a` `href` tags.
