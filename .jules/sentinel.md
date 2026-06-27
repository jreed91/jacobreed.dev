## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via malicious videoUrl]
**Vulnerability:** XSS vulnerability where untrusted `videoUrl` from frontmatter in MDX talk files was used as the fallback `src` in an `iframe` in `app/components/TalkLayout.tsx` without validating the URL protocol. This allowed execution of `javascript:` or `data:` URIs if provided as the `videoUrl`.
**Learning:** `iframe` `src` attributes are a prime target for XSS and must always be validated to ensure they use a secure protocol (`http:` or `https:`), or gracefully default to a safe value like `about:blank`.
**Prevention:** Use the `URL` constructor (e.g. `new URL(url, 'http://localhost')`) to safely parse untrusted URLs before assigning them to dynamic properties like `iframe src` or `a href`. Regex checking or `startsWith` validation can be bypassed.
