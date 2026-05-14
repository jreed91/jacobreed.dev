## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-05-14 - [Fix Stored XSS in iframe src attribute]
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` directly returned unvalidated `videoUrl` values from MDX frontmatter into an `iframe` `src` attribute in `app/components/TalkLayout.tsx`. This allowed arbitrary execution of `javascript:` or `data:` URIs if malicious content was placed in the markdown files (Stored XSS).
**Learning:** `iframe` `src` attributes are execution contexts. When binding user or file-derived strings directly to an `iframe src`, you must validate that the URI protocol is safe (`http:` or `https:`) because modern browsers will execute `javascript:` payloads within the iframe context.
**Prevention:** Always validate external URLs bound to execution contexts (like `iframe src`, `a href`, `object data`) using the native `URL` constructor. Enforce `http:` or `https:` protocols, and gracefully fallback to `about:blank` for invalid or unsafe URIs.
