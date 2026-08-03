## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via data/javascript URIs]
**Vulnerability:** XSS vulnerability where untrusted user input from MDX frontmatter (e.g., `videoUrl` for talks) could be passed directly into the `src` attribute of an `iframe` without validating the URL protocol. This allows malicious URLs using `javascript:` or `data:` URIs to execute arbitrary code when rendered.
**Learning:** `iframe` `src` attributes do not automatically block `javascript:` or `data:` URIs. Relying solely on `https:` or `http:` regex matching for expected URLs is insufficient when the fallback path returns the raw string unaltered, leaving it open to malicious payloads.
**Prevention:** Always validate URL protocols for dynamic `iframe` `src` attributes using the native `URL` constructor (e.g., `new URL(videoUrl, 'http://localhost')`). Explicitly verify that the parsed protocol is `http:` or `https:`, or fall back to safe paths like `about:blank`.

## 2025-03-03 - [Fix Stored XSS in Link hrefs]
**Vulnerability:** CodeQL flagged a Stored Cross-Site Scripting (XSS) vulnerability in `Link` `href`s because unencoded variables (`talk.slug`, `blog.slug`) from MDX frontmatter were directly interpolated into paths (e.g., `<Link href={"/blog/" + slug}>`).
**Learning:** Even internal framework routing tools like Next.js `Link` do not automatically sanitize interpolated string properties for `href`. If a malicious slug containing URI syntax characters or traversal strings (like `javascript:` or `%00` or `../`) were somehow injected or parsed from markdown frontmatter, it could lead to XSS or unexpected routing behaviors.
**Prevention:** Always wrap dynamically generated, file-derived identifiers with `encodeURIComponent()` when interpolating them into URL paths within application routing or anchors to ensure they are safely treated as path segments.
