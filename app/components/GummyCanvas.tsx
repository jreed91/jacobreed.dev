"use client";
import { useEffect, useRef } from "react";
import { readGummyColors, tint } from "./gummy/colors";
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

    const colors = readGummyColors(document.documentElement);
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
      for (const { body, i } of order) drawGummy(ctx, body, colors[i % colors.length]);
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

  // Lighting scales with the letter's rest size; the box follows its stretch.
  const h = body.height;
  const { minX, minY, maxX, maxY } = body;
  const w = maxX - minX;

  // Body: translucent candy, lighter where light comes through the top, with
  // a coloured shadow like light passing through gelatin.
  ctx.save();
  const fill = ctx.createLinearGradient(0, minY, 0, maxY);
  fill.addColorStop(0, tint(color, 0.3, 0.86));
  fill.addColorStop(0.55, tint(color, 0, 0.84));
  fill.addColorStop(1, tint(color, -0.12, 0.9));
  ctx.fillStyle = fill;
  ctx.shadowColor = tint(color, 0, 0.45);
  ctx.shadowBlur = h * 0.22;
  ctx.shadowOffsetY = h * 0.1;
  ctx.fill(path, "evenodd");
  ctx.restore();

  ctx.save();
  ctx.clip(path, "evenodd");

  // Thicker candy at the edges reads darker and more saturated.
  ctx.lineWidth = h * 0.1;
  ctx.strokeStyle = tint(color, -0.35, 0.55);
  ctx.shadowColor = tint(color, -0.35, 0.8);
  ctx.shadowBlur = h * 0.12;
  ctx.stroke(path);
  ctx.shadowColor = "transparent";

  // Light catching the inside of the top-left edge.
  ctx.translate(h * 0.035, h * 0.045);
  ctx.lineWidth = h * 0.05;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.stroke(path);
  ctx.translate(-h * 0.035, -h * 0.045);

  // A soft glow through the middle and a crisp specular highlight.
  const cx = minX + w * 0.5;
  const cy = minY + (maxY - minY) * 0.55;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.6);
  glow.addColorStop(0, tint(color, 0.45, 0.35));
  glow.addColorStop(1, tint(color, 0.45, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(minX, minY, w, maxY - minY);

  const sx = minX + w * 0.28;
  const sy = minY + h * 0.16;
  const spec = ctx.createRadialGradient(sx, sy, 0, sx, sy, h * 0.22);
  spec.addColorStop(0, "rgba(255, 255, 255, 0.85)");
  spec.addColorStop(0.35, "rgba(255, 255, 255, 0.35)");
  spec.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = spec;
  ctx.fillRect(minX, minY, w, maxY - minY);
  ctx.restore();

  ctx.lineWidth = 1;
  ctx.strokeStyle = tint(color, -0.4, 0.5);
  ctx.stroke(path);
}
