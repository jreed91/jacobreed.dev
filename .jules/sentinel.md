## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-24 - [XSS via Fallback URLs in iframe src]
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` falls back to returning the provided URL unchanged if it does not match a YouTube pattern. This fallback URL is directly injected into an `iframe`'s `src` attribute in `TalkLayout.tsx`. An attacker could exploit this by providing a `javascript:` or `data:` URI in the MDX frontmatter, leading to Cross-Site Scripting (XSS) when the `iframe` is rendered.
**Learning:** React does not natively sanitize string props passed to potentially dangerous HTML attributes like `iframe` `src`. Fallback mechanisms must strictly validate output types and enforce safe protocols before injection.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor before injecting them into `iframe` `src` or `<Link href>` attributes. Use a whitelist approach (e.g., enforcing `http:` or `https:`) and fall back to safe defaults like `about:blank` for invalid inputs. Avoid RegEx for protocol validation.
