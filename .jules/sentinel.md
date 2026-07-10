## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-07-10 - [Enhance XSS & DoS protection in safeJsonStringify]
**Vulnerability:** DoS vulnerability via  when  returns , and missing defense-in-depth XSS escapes in .
**Learning:**  returns `undefined` (not the string `"undefined"`) when passed `undefined`, functions, or symbols. Calling `.replace()` on this result causes a runtime crash. Furthermore, failing to escape `/`, `\u2028`, and `\u2029` can lead to subtle XSS or syntax errors when JSON is embedded in `<script>` blocks.
**Prevention:** Always check if the result of  is  before chaining string methods, and proactively escape forward slashes and unicode line terminators when stringifying JSON for script tags.

## 2025-03-03 - [Enhance XSS & DoS protection in safeJsonStringify]
**Vulnerability:** DoS vulnerability via `TypeError` when `JSON.stringify` returns `undefined`, and missing defense-in-depth XSS escapes in `safeJsonStringify`.
**Learning:** `JSON.stringify` returns `undefined` (not the string `"undefined"`) when passed `undefined`, functions, or symbols. Calling `.replace()` on this result causes a runtime crash. Furthermore, failing to escape `/`, `\u2028`, and `\u2029` can lead to subtle XSS or syntax errors when JSON is embedded in `<script>` blocks.
**Prevention:** Always check if the result of `JSON.stringify` is `undefined` before chaining string methods, and proactively escape forward slashes and unicode line terminators when stringifying JSON for script tags.
