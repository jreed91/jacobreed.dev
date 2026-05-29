## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Stored XSS in MDX videoUrl iframe]
**Vulnerability:** The `getYouTubeEmbedUrl` function directly returned unvalidated URLs into an `iframe` `src` attribute when the URL was not a YouTube embed. This allowed Stored XSS if MDX frontmatter contained an unsafe scheme like `videoUrl: javascript:alert(1)`.
**Learning:** `iframe src` attributes are vulnerable to XSS execution via the `javascript:` and `data:` schemes. Falling back to an unsanitized raw string from user-controlled frontmatter bypasses standard input validations and allows attackers to execute scripts in the application context.
**Prevention:** Always validate URL protocols dynamically interpolated into `iframe` sources using the native `URL` constructor to enforce `http:` or `https:`. Return safe fallbacks like `about:blank` for invalid or malicious schemes.
