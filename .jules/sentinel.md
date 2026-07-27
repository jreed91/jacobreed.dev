## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-30 - XSS Vulnerability in TalkLayout
**Vulnerability:** Unsanitized dynamic `iframe` `src` attribute from markdown files allowed injection of `javascript:` URIs, leading to Cross-Site Scripting (XSS).
**Learning:** `iframe` `src` attributes do not inherently block `javascript:` or `data:` URIs in React/Next.js.
**Prevention:** Always validate protocols of user-provided or statically generated URLs destined for interactive elements (`a` tags, `iframe` `src`) using `new URL()` to enforce only `http:` or `https:`.
