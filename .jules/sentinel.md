## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where user-supplied URLs (like video embed links) were not validated before being passed as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`.
**Learning:** React does not prevent `javascript:` or `data:` URIs from being rendered in an `iframe`'s `src` attribute. If arbitrary user input is passed to an `iframe src`, an attacker can execute code or mount a phishing attack.
**Prevention:** Always validate protocols on URLs bound to `iframe src` or link `href` attributes, ensuring they are only `http:`, `https:`, or fallbacks like `about:blank`.
