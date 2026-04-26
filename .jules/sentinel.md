## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-04-26 - [XSS/SSRF via MDX Iframe Frontmatter]
**Vulnerability:** The `getYouTubeEmbedUrl` function did not validate the protocol of non-YouTube URLs. Because its output is directly used as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`, a malicious author could inject `javascript:` or `data:` URLs via MDX frontmatter, leading to XSS or SSRF execution when the user views the talk page.
**Learning:** URLs parsed from untrusted sources (like MDX frontmatter) that bypass external domains must have their protocols validated before being used in sensitive DOM attributes like `iframe src` or `a href`.
**Prevention:** Validate protocols using the native `URL` constructor to ensure they match `http:` or `https:`. Return `about:blank` for invalid protocols to ensure safe failure.
