## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability where untrusted user input from talk frontmatter was injected into `iframe src` without validation in `getYouTubeEmbedUrl`. `javascript:` and `data:` URIs were not sanitized.
**Learning:** `iframe` `src` attributes can execute arbitrary JavaScript if given a `javascript:` or `data:` URI. Using a regex for specific URLs like youtube is good, but any unvalidated fallback strings can introduce XSS.
**Prevention:** Always validate URL protocols using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) before injecting dynamic strings into `iframe` `src` or `a` `href` attributes, and only allow `http:` or `https:`.

## 2025-03-03 - [Fix CodeQL Stored XSS in Link hrefs]
**Vulnerability:** CodeQL flagged a Stored XSS vulnerability because file-derived properties like `slug` from MDX metadata were interpolated directly into Next.js `<Link href={...}>` components (e.g. ``href={`/talks/${talk.slug}`}``) without sanitization.
**Learning:** Even internal file-system derived variables like slugs must be treated as untrusted data if they aren't explicitly restricted to safe character sets at generation time. Unescaped strings in `href` could potentially break out of the URL path context or inject malicious payloads if the slug somehow contained unexpected characters.
**Prevention:** Sanitize URL path segments using `encodeURIComponent(slug)` when constructing dynamic routes in components like `TalkCard`, `BlogPost`, `BlogPostCard`, and `BlogLayout`. Do not apply it to full absolute URLs or paths with slashes.
