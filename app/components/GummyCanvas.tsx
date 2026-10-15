"use client";
import { useEffect, useRef } from "react";
import { GUMMY_COLORS, tint } from "./gummy/colors";
import { layoutWord } from "./gummy/wordLayout";
import { Body, GummySim } from "./gummy/sim";

/**
 * Soft-body physics for the gummy "Jacob" in the hero heading. Covers the
 * hero section, finds the static GummyName, and replaces it with letters you
 * can poke, stretch and fling. Clicks fall through to the page everywhere
 * except on a letter.
 */
export default function GummyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const word = section?.querySelector<SVGSVGElement>("[data-gummy-name]");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !word || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let sim: GummySim;
    let dpr = 1;
    let wordLeft = 0;
    let wordTop = 0;

    const wordBox = () => {
      const s = section.getBoundingClientRect();
      const w = word.getBoundingClientRect();
      return { s, left: w.left - s.left, top: w.top - s.top, height: w.height };
    };

    const setup = () => {
      const { s, left, top, height } = wordBox();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(s.width * dpr);
      canvas.height = Math.round(s.height * dpr);
      // Smaller letters on phones get fewer, closer particles.
      const spacing = Math.min(8, Math.max(4, height / 16));
      sim = new GummySim(layoutWord(left, top, height), s.width, s.height, spacing);
      wordLeft = left;
      wordTop = top;
    };

    const local = (clientX: number, clientY: number): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [clientX - r.left, clientY - r.top];
    };

    let lastX = 0;
    let lastY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const [x, y] = local(e.clientX, e.clientY);
      sim.move(x, y, x - lastX, y - lastY);
      lastX = x;
      lastY = y;
      if (!sim.grabbing) section.style.cursor = sim.hitTest(x, y) >= 0 ? "grab" : "";
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as Element).closest("a, button")) return;
      const [x, y] = local(e.clientX, e.clientY);
      lastX = x;
      lastY = y;
      if (sim.press(x, y)) {
        e.preventDefault();
        section.style.cursor = "grabbing";
      }
    };
    const onPointerUp = () => {
      if (!sim.grabbing) return;
      sim.release();
      section.style.cursor = "";
    };
    // Stop the page scrolling while a finger is on a letter.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if ((e.target as Element).closest("a, button")) return;
      if (t && sim.hitTest(...local(t.clientX, t.clientY)) >= 0) e.preventDefault();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (sim.grabbing) e.preventDefault();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, sim.width, sim.height);
      // Loose letters draw on top of the ones still at home.
      const order = sim.bodies
        .map((body, i) => ({ body, i }))
        .sort((a, b) => Number(a.body.state !== "anchored") - Number(b.body.state !== "anchored"));
      for (const { body, i } of order) drawGummy(ctx, body, GUMMY_COLORS[i % GUMMY_COLORS.length]);
    };

    let frame = 0;
    let last = 0;
    let visible = true;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (!visible) return;
      // Follow the heading if it reflows, e.g. when the typewriter line wraps.
      const { left, top } = wordBox();
      if (left !== wordLeft || top !== wordTop) {
        sim.shiftHome(left - wordLeft, top - wordTop);
        wordLeft = left;
        wordTop = top;
      }
      sim.step(dt);
      draw();
    };

    setup();
    draw();
    word.style.visibility = "hidden";
    frame = requestAnimationFrame(tick);

    let resizeFrame = 0;
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(setup);
    });
    resize.observe(section);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(section);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    section.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      resize.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      section.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      section.style.cursor = "";
      word.style.visibility = "";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-20 w-full h-full pointer-events-none"
    />
  );
}

function drawGummy(ctx: CanvasRenderingContext2D, body: Body, color: string) {
  const path = new Path2D();
  for (const ids of body.contours) {
    // Smooth closed curve through the midpoints of the outline particles.
    const n = ids.length;
    const mid = (k: number): [number, number] => {
      const a = ids[k % n];
      const b = ids[(k + 1) % n];
      return [(body.x[a] + body.x[b]) / 2, (body.y[a] + body.y[b]) / 2];
    };
    const [sx, sy] = mid(0);
    path.moveTo(sx, sy);
    for (let k = 1; k <= n; k++) {
      const p = ids[k % n];
      const [mx, my] = mid(k);
      path.quadraticCurveTo(body.x[p], body.y[p], mx, my);
    }
    path.closePath();
  }

  const h = body.height;
  const w = body.maxX - body.minX;

  ctx.save();
  const fill = ctx.createLinearGradient(0, body.minY, 0, body.maxY);
  fill.addColorStop(0, tint(color, 0.35, 0.92));
  fill.addColorStop(1, tint(color, 0, 0.92));
  ctx.fillStyle = fill;
  ctx.shadowColor = tint(color, -0.2, 0.35);
  ctx.shadowBlur = h * 0.18;
  ctx.shadowOffsetY = h * 0.07;
  ctx.fill(path, "evenodd");
  ctx.restore();

  // Glossy highlight and a soft inner rim, clipped to the letter.
  ctx.save();
  ctx.clip(path, "evenodd");
  const gx = body.minX + w * 0.3;
  const gy = body.minY + h * 0.18;
  const gloss = ctx.createRadialGradient(gx, gy, 0, gx, gy, h * 0.55);
  gloss.addColorStop(0, "rgba(255, 255, 255, 0.6)");
  gloss.addColorStop(0.45, "rgba(255, 255, 255, 0.12)");
  gloss.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gloss;
  ctx.fillRect(body.minX, body.minY, w, h);
  ctx.lineWidth = Math.max(2, h * 0.06);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.stroke(path);
  ctx.restore();

  ctx.lineWidth = 1;
  ctx.strokeStyle = tint(color, -0.25, 0.45);
  ctx.stroke(path);
}
