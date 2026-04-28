## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-26 - [Fix SSRF/XSS in iframe source]
**Vulnerability:** A cross-site scripting (XSS) vulnerability existed where user-provided `videoUrl` input that did not match the expected YouTube format was passed directly to the `src` attribute of an `iframe` tag without validation in `TalkLayout`. Attackers could inject `javascript:` or `data:` URIs leading to arbitrary code execution within the iframe context.
**Learning:** React safely encodes standard text contents but treats the `src` attribute of `iframe` tags as safe by default, expecting developers to provide trusted URLs. Bypassing custom RegEx matching creates an open door for arbitrary string fallbacks. Relying on the built-in `new URL()` API ensures robust validation of protocols.
**Prevention:** Always parse and validate protocols for dynamically generated `iframe` `src` inputs or any `a` tag `href` links using the built-in `URL` constructor (enforcing `http:` or `https:`) before rendering, and return a safe fallback like `about:blank` on error.
