## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS via Unsafe iframe src]
**Vulnerability:** XSS vulnerability where user-provided `videoUrl` in MDX frontmatter was rendered directly into the `src` attribute of an `iframe` in `TalkLayout.tsx` without protocol validation if it didn't match the YouTube regex.
**Learning:** `iframe` `src` attributes can execute Javascript if prefixed with `javascript:` or `data:`. React does not natively sanitize URLs passed to iframe src.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor before injecting them into `iframe` `src` attributes or `Link` hrefs. Fall back to safe alternatives like `about:blank` for invalid protocols.
