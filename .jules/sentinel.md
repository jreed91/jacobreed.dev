## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via data/javascript URLs]
**Vulnerability:** XSS vulnerability where user-supplied `videoUrl` values from MDX frontmatter are placed directly into `iframe src` attributes in `app/components/TalkLayout.tsx` without validating the protocol.
**Learning:** `iframe` `src` attributes can execute arbitrary JavaScript if supplied with a `javascript:` or `data:` URL. This allows XSS if an attacker controls or injects values into the MDX frontmatter.
**Prevention:** Always validate protocols of dynamically inserted URLs used in `href` or `src` attributes. Only allow `http:`, `https:`, and root-relative (`/`) paths. Fallback to `about:blank` for invalid inputs.
