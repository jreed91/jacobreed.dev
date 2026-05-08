## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix Denial of Service Risk in safeJsonStringify]
**Vulnerability:** The `safeJsonStringify` utility in `app/utils/sanitize.ts` threw a TypeError when passed `undefined`, because `JSON.stringify(undefined)` returns `undefined`, which doesn't have a `.replace` method. Since this utility is used in crucial code paths like generating JSON-LD for Next.js metadata, rendering an undefined metadata object would crash the page.
**Learning:** Utilities that chain methods on standard JavaScript functions like `JSON.stringify` must account for the full range of possible return types (e.g., string or undefined) to prevent unexpected runtime exceptions that act as DoS vulnerabilities.
**Prevention:** Always validate or provide a safe default string (e.g., `'{}'`) when the source data can result in `undefined` output from `JSON.stringify()`.
