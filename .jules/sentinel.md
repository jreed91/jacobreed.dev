## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-27 - [Sentinel: Prevent XSS in YouTube embed URL generation]
**Vulnerability:** XSS vulnerability where untrusted user input from MDX frontmatter (`videoUrl`) was used as the fallback `src` for the `iframe` in `app/components/TalkLayout.tsx` without proper sanitization. The previous fallback just returned the `videoUrl` directly, which could contain `javascript:` or `data:` URIs.
**Learning:** `iframe` `src` attributes are not natively sanitized by React/Next.js. Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
**Prevention:** Use the `new URL(url, base)` constructor to parse and check `.protocol === 'http:' || .protocol === 'https:'`. Relative URLs can be parsed safely by providing a base URL like `'http://localhost'`. Return a safe fallback like `about:blank` on error or invalid protocols.
