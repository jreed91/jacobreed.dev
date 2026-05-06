## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS vulnerability where untrusted URLs from MDX frontmatter (talk `videoUrl`) were passed unfiltered to an `iframe`'s `src` attribute. If a URL didn't match the YouTube regex, the original string was returned, allowing an attacker to inject `javascript:` or `data:` URIs and execute arbitrary scripts.
**Learning:** `iframe` `src` attributes are sensitive to XSS and SSRF. Regexes or standard `startsWith` checks can often be bypassed.
**Prevention:** Always validate URL protocols using the native `URL` constructor (`new URL(url, base)`) and explicitly allow only safe protocols (`http:`, `https:`, or root-relative paths) before setting dynamically sourced URLs in `iframe`, `a`, or `img` tags. If validation fails, fallback safely to `about:blank`.
