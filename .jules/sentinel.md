## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in Talks]
**Vulnerability:** XSS vulnerability where `videoUrl` derived from MDX frontmatter was rendered directly into an `iframe`'s `src` attribute without protocol validation in `app/components/TalkLayout.tsx`.
**Learning:** Even though `iframe` tags are generally thought of for embedding, malicious `javascript:` or `data:` URIs in the `src` attribute can execute arbitrary code in the context of the page if the iframe lacks a restrictive `sandbox` attribute. Content derived from local Markdown files still needs sanitization if it specifies executable attributes.
**Prevention:** Always enforce safe protocol validation (`http://`, `https://`, or root-relative paths starting with `/`) for dynamically populated `href` or `src` attributes. Fall back to a safe default like `about:blank` for invalid URLs.
