## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS vulnerability where `videoUrl` from frontmatter in MDX talks was directly rendered into the `src` attribute of an `iframe` in `TalkLayout.tsx` without validating the URL scheme.
**Learning:** `iframe` `src` attributes are execution sinks. Using untrusted or user-defined URLs can result in XSS if an attacker inputs a `javascript:` or `data:text/html` payload.
**Prevention:** Always validate URL schemes before injecting them into `src` attributes. Use `new URL(url, 'http://localhost')` to extract the `protocol` and enforce that it matches `http:` or `https:`. If validation fails, safely fallback to `about:blank`.
