## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS]
**Vulnerability:** XSS vulnerability where user-supplied URLs (from MDX frontmatter) were injected directly into the `src` attribute of `iframe` tags without protocol validation in `app/components/TalkLayout.tsx` (via `getYouTubeEmbedUrl`).
**Learning:** `iframe` `src` attributes are susceptible to execution of arbitrary JavaScript via `javascript:` URIs or loading malicious content via `data:` URIs. Relying solely on a regex to convert specific YouTube URLs is not sufficient if the fallback is to return the raw input.
**Prevention:** Always validate protocols for user-supplied URLs used in `src` or `href` attributes. Ensure they are explicitly `http:`, `https:`, or safe root-relative paths, and fallback to `about:blank` for invalid or unsafe URIs.
