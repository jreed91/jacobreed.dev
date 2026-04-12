## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix SSRF/XSS in iframe source]
**Vulnerability:** XSS/SSRF vulnerability where malicious strings provided to `videoUrl` in MDX frontmatter could bypass standard YouTube parsing and be directly injected into an `<iframe src="...">` attribute without checking for unsafe protocols like `javascript:` or `data:`.
**Learning:** `iframe` `src` attributes can execute Javascript when using the `javascript:` protocol. If `src` relies on dynamic or user-controlled fallback URLs, parsing with `new URL()` with a base URL is an effective way to extract `.protocol` and reliably allowlist safe protocols (e.g., `http:`, `https:`, `about:`).
**Prevention:** Whenever rendering an `iframe` with a dynamically resolved or user-controlled URL, always rigorously allowlist the allowed protocols. Use `new URL(url, 'http://localhost')` to properly extract `.protocol` since Regex or `.startsWith` validations can be bypassed with whitespace padding or unusual casing.

## 2025-03-03 - [Fix Stored XSS in Link href]
**Vulnerability:** CodeQL flagged a stored cross-site scripting vulnerability in `app/components/TalkCard.tsx` on line 7 where `talk.slug` was directly interpolated into a `href` string without URL encoding.
**Learning:** Even internal URLs generated from file slugs or database entries can be flagged as stored XSS by SAST tools if they are directly injected into `href` or `src` attributes without proper sanitization/encoding. Attackers could theoretically craft a slug like `"javascript:..."` or use special characters.
**Prevention:** Always use `encodeURIComponent()` when interpolating dynamic data (like slugs or user input) into URL paths or query parameters.
