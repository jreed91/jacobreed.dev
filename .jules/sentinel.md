## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS in iframe src from video embed URLs]
**Vulnerability:** XSS vulnerability where unsafe URIs (e.g. `javascript:`, `data:`) could be passed to the `videoUrl` frontmatter field in markdown files, and embedded into an `iframe` `src` attribute. The `getYouTubeEmbedUrl` fallback logic previously returned any non-YouTube URL directly without validating its protocol.
**Learning:** `iframe` `src` attributes can execute code via `javascript:` URIs or render arbitrary HTML via `data:` URIs. Relying solely on regex to detect YouTube URLs is not enough if the fallback logic is blindly passing the original input. Native `URL` object parsing accurately extracts protocols despite padding/whitespace evasions.
**Prevention:** Always validate protocols for externally sourced URLs before inserting them into potentially dangerous attributes like `iframe` `src` or `a` `href`. Use the `new URL()` constructor with a fallback base URL to parse inputs, verify the protocol is `http:` or `https:`, and safely fall back to `about:blank` or safe relative paths when unsafe URIs are detected.
