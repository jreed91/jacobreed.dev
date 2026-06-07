## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-27 - Fix XSS vulnerability in getYouTubeEmbedUrl
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` where unrecognized URLs were returned as-is, allowing them to be injected into `iframe` `src` attributes. This permitted potentially dangerous protocols like `javascript:` or `data:` to execute when embedded in the talk layout.
**Learning:** Returning unsanitized user-provided URIs into `iframe` `src` or `a` `href` tags can result in XSS execution. Regex validation should not just identify known good patterns (like YouTube URLs) but must also sanitize the fallback outputs. Using the native `URL` constructor to validate the `.protocol` property is a reliable way to verify safe URLs and avoids regex-based parsing errors or bypasses.
**Prevention:** Always sanitize dynamically constructed or fallback URLs used in DOM injection points. Ensure that `new URL(url, base)` is utilized to parse and validate protocols like `http:` or `https:`, or enforce root-relative paths starting with `/`. If validation fails, return a safe fallback such as `about:blank`.
