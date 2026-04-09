## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-04-09 - [iframe src XSS Vulnerability via Fallback Protocol Validation]
**Vulnerability:** XSS/SSRF via unsanitized `videoUrl` directly injected into `iframe` `src` attribute. When MDX frontmatter `videoUrl` was not a YouTube URL, the application returned the URL unchanged, allowing `javascript:` or `data:` URIs to execute arbitrary code in `app/components/TalkLayout.tsx`.
**Learning:** React escapes content but NOT attribute values like `href` or `src` containing malicious URI schemes. Fallback URLs extracted from user input or frontmatter MUST be strictly protocol-validated before injection into risky elements (`iframe`, `a`, `object`, etc.).
**Prevention:** Implement strict URI protocol validation checking for `http:` or `https:`. Use `new URL(url, 'http://localhost')` for robust extraction and check `.protocol`. Explicitly deny protocol-relative URIs (`//...`) if unintended. Return a safe fallback like `about:blank`.
