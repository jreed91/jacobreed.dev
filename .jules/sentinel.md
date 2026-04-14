## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-18 - [Fix XSS Vulnerability in YouTube Embed Fallback URL]
**Vulnerability:** XSS vulnerability where non-YouTube fallback URLs in `getYouTubeEmbedUrl` inside `app/db/talks.ts` were passed unchecked to an iframe's `src` attribute. This allowed execution of malicious `javascript:` and `data:` URIs if passed as a `videoUrl` in MDX metadata.
**Learning:** Returning unfiltered URLs to act as fallback iframe `src`s can trigger JavaScript execution if it evaluates to a `javascript:` or `data:` schema. Always validate schemas for `href` and `src` links originating from data or MDX files.
**Prevention:** Check the URL's protocol property strictly with `new URL(url, 'http://localhost')` before returning it as a safe fallback link. Default any unmatched schema or unparseable URLs to `about:blank`.
