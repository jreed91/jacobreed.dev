## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS in TalkLayout Video iframe]
**Vulnerability:** XSS vulnerability where `videoUrl` sourced from MDX frontmatter was directly placed in the `src` attribute of an `iframe` component within `TalkLayout.tsx` via `getYouTubeEmbedUrl` when it was not a match for YouTube URL logic.
**Learning:** Any user-controlled (or in this case, markdown frontmatter-controlled) URL rendered in an `iframe` or `a` tag `src`/`href` must be validated against dangerous protocols like `javascript:` or `data:`, otherwise attackers can execute arbitrary JS via URLs.
**Prevention:** In `getYouTubeEmbedUrl`, validate URLs to ensure they use allowed protocols (`http://`, `https://`) or are root-relative (`/`) paths before returning them; otherwise fallback to safe URLs like `'about:blank'`.
