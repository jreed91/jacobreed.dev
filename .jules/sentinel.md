## 2025-02-23 - URL Protocol Validation for XSS Prevention
**Vulnerability:** XSS vulnerability via unsafe protocols in MDX videoUrl.
**Learning:** `startsWith` and regex validation are insufficient for URL protocols because spaces (` javascript:`) or other characters can bypass simple checks.
**Prevention:** Use the `URL` constructor to accurately identify and restrict URL `.protocol` values.
