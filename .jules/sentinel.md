## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-04-07 - [Secure URL Validation for iFrames]
**Vulnerability:** XSS vulnerability via unsafe URL protocols (e.g., `javascript:`, `data:`) used directly in dynamic `iframe` `src` attributes within `app/db/talks.ts` and `app/components/TalkLayout.tsx`.
**Learning:** Returning user-provided or unverified URLs (like fallback `videoUrl`) directly into an `iframe src` without protocol validation allows arbitrary script execution if the URL uses `javascript:`. Simple regex checks (like for YouTube) are insufficient if the fallback is a raw return of the input.
**Prevention:** Always validate protocols using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) and strictly enforce safe protocols (`http:`, `https:`) before assigning to `iframe src` or similar sensitive DOM sink attributes. Default to `about:blank` for invalid inputs.
