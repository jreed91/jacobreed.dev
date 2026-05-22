import { expect, test } from "vitest";
import { safeJsonStringify } from "./sanitize";

test("safeJsonStringify handles undefined", () => {
  expect(safeJsonStringify(undefined)).toBe("undefined");
});

test("safeJsonStringify escapes characters properly", () => {
  const result = safeJsonStringify({ text: "</script>& \u2028 \u2029" });
  expect(result).toBe(
    '{"text":"\\u003c\\u002fscript\\u003e\\u0026 \\u2028 \\u2029"}',
  );
});
