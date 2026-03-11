## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix IFRAME src XSS]
**Vulnerability:** XSS vulnerability where MDX frontmatter field `videoUrl` for a talk could contain arbitrary URIs (e.g. `javascript:alert(1)`). When this frontmatter is rendered into the `<iframe src={embedUrl}>` on the client, it would execute the javascript if the user's browser loaded the iframe or if it was otherwise triggered.
**Learning:** React escapes HTML entities, but `src` or `href` attributes can still execute arbitrary code if they contain malicious URI schemes like `javascript:` or `data:`. Fallback values that use these attributes directly from user-input (or MDX files) must validate the protocol or at least sanitize the URI to safe schemes (`http(s)`) or relative paths.
**Prevention:** Always ensure dynamically generated URIs used in `src` or `href` attributes are either whitelisted formats or strictly require `http://`, `https://`, or `/` relative paths to prevent URI-based XSS attacks.
