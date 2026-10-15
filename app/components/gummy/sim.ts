// Soft-body simulation for the gummy homepage letters.
//
// Each letter is a cloud of particles (its outline plus an interior grid)
// integrated with Verlet and held together by position-based constraints:
// short distance links give local squish, a global shape-matching pass keeps
// the letter recognisable, and a soft spring pulls it towards its home in the
// heading. Pull a letter far enough and it pops loose, falls under gravity,
// bounces around the hero and later hops back home.
//
// Pure TypeScript with no DOM access so it can be unit tested.

export type BodyState = "anchored" | "loose" | "returning";

export interface Body {
  x: Float64Array;
  y: Float64Array;
  px: Float64Array;
  py: Float64Array;
  // Rest shape relative to the rest centre of mass.
  qx: Float64Array;
  qy: Float64Array;
  homeX: number;
  homeY: number;
  links: Int32Array;
  linkRest: Float64Array;
  // Outline particle indices, one array per contour, in drawing order.
  contours: number[][];
  state: BodyState;
  timer: number;
  phase: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface LayoutGlyph {
  // Outline contours in canvas pixels.
  contours: [number, number][][];
}

interface Grab {
  body: number;
  indices: number[];
  weights: number[];
  offX: number[];
  offY: number[];
  startX: number;
  startY: number;
}

const SUBSTEP = 1 / 120;
const MAX_SUBSTEPS = 4;
const ITERATIONS = 2;
const GRAVITY = 2600;
const LINK_K = 0.6;
const SHAPE_K = 0.12;
const SHAPE_K_FREE = 0.18;
const ANCHOR_K = 0.035;
const RETURN_K = 0.06;
const GRAB_K = 0.35;
const DAMP_ANCHORED = 0.985;
const DAMP_FREE = 0.997;
const RESTITUTION = 0.45;
const FRICTION = 0.7;
const POP_DISTANCE = 1.1; // in heights of the tallest letter
const RETURN_DELAY = 2.8; // seconds a loose letter lingers before hopping home
const HOP_SPEED = 900;
const BREATH = 0.018;
const MAX_STRETCH = 2.5;

export class GummySim {
  bodies: Body[] = [];
  width: number;
  height: number;
  radius: number;
  // Height of the tallest letter, so small letters are as hard to pop as big ones.
  unit: number;
  time = 0;
  private grab: Grab | null = null;
  private pointerX = 0;
  private pointerY = 0;
  private accumulator = 0;

  constructor(glyphs: LayoutGlyph[], width: number, height: number, spacing: number) {
    this.width = width;
    this.height = height;
    this.radius = spacing * 0.5;
    this.bodies = glyphs.map((g, i) => buildBody(g, spacing, i));
    this.unit = Math.max(...this.bodies.map((b) => b.height));
  }

  get grabbing(): boolean {
    return this.grab !== null;
  }

  /** Index of the letter under (x, y), or -1. */
  hitTest(x: number, y: number): number {
    for (let b = this.bodies.length - 1; b >= 0; b--) {
      const body = this.bodies[b];
      if (x < body.minX || x > body.maxX || y < body.minY || y > body.maxY) continue;
      if (pointInBody(body, x, y)) return b;
    }
    return -1;
  }

  /** Starts dragging the letter under (x, y). Returns false on a miss. */
  press(x: number, y: number): boolean {
    const b = this.hitTest(x, y);
    if (b < 0) return false;
    const body = this.bodies[b];
    const reach = body.height * 0.45;
    const grab: Grab = { body: b, indices: [], weights: [], offX: [], offY: [], startX: x, startY: y };
    for (let i = 0; i < body.x.length; i++) {
      const dx = body.x[i] - x;
      const dy = body.y[i] - y;
      const d = Math.hypot(dx, dy);
      if (d < reach) {
        grab.indices.push(i);
        grab.weights.push(1 - d / reach);
        grab.offX.push(dx);
        grab.offY.push(dy);
      }
    }
    this.squash(b, 0.05);
    this.grab = grab;
    this.pointerX = x;
    this.pointerY = y;
    return true;
  }

  move(x: number, y: number, dx: number, dy: number): void {
    this.pointerX = x;
    this.pointerY = y;
    if (this.grab) return;
    // Brushing past a letter makes it wobble.
    const len = Math.hypot(dx, dy);
    if (len === 0) return;
    const scale = Math.min(len, 40) / len;
    for (const body of this.bodies) {
      const reach = body.height * 0.6;
      if (x < body.minX - reach || x > body.maxX + reach || y < body.minY - reach || y > body.maxY + reach) continue;
      for (let i = 0; i < body.x.length; i++) {
        const d = Math.hypot(body.x[i] - x, body.y[i] - y);
        if (d >= reach) continue;
        const f = (1 - d / reach) * 0.06 * scale;
        body.px[i] -= dx * f;
        body.py[i] -= dy * f;
      }
    }
  }

  release(): void {
    if (!this.grab) return;
    const body = this.bodies[this.grab.body];
    if (body.state === "loose") body.timer = 0;
    this.grab = null;
  }

  /** Flattens a letter vertically and spreads it sideways, as on a click. */
  squash(b: number, amount: number): void {
    const body = this.bodies[b];
    const [cx, cy] = centre(body);
    for (let i = 0; i < body.x.length; i++) {
      body.px[i] -= (body.x[i] - cx) * amount * 0.6;
      body.py[i] += (body.y[i] - cy) * amount;
    }
  }

  /** Moves every letter's home, e.g. when the heading reflows. */
  shiftHome(dx: number, dy: number): void {
    for (const body of this.bodies) {
      body.homeX += dx;
      body.homeY += dy;
    }
  }

  /** Advances the simulation by dt seconds of wall time. */
  step(dt: number): void {
    this.accumulator = Math.min(this.accumulator + dt, SUBSTEP * MAX_SUBSTEPS);
    while (this.accumulator >= SUBSTEP) {
      this.substep(SUBSTEP);
      this.accumulator -= SUBSTEP;
    }
  }

  private substep(h: number): void {
    this.time += h;
    const g = GRAVITY * h * h;

    for (let b = 0; b < this.bodies.length; b++) {
      const body = this.bodies[b];
      const damp = body.state === "anchored" ? DAMP_ANCHORED : DAMP_FREE;
      const gy = body.state === "loose" ? g : 0;
      for (let i = 0; i < body.x.length; i++) {
        const vx = (body.x[i] - body.px[i]) * damp;
        const vy = (body.y[i] - body.py[i]) * damp;
        body.px[i] = body.x[i];
        body.py[i] = body.y[i];
        body.x[i] += vx;
        body.y[i] += vy + gy;
      }
    }

    if (this.grab) this.applyGrab();

    for (const body of this.bodies) {
      for (let it = 0; it < ITERATIONS; it++) solveLinks(body);
      matchShape(body, body.state === "anchored" ? SHAPE_K : SHAPE_K_FREE);
      this.applyHome(body, h);
    }

    this.collideBodies();
    for (const body of this.bodies) {
      if (body.state !== "anchored") this.collideBounds(body);
      updateBounds(body);
    }
  }

  private applyGrab(): void {
    const grab = this.grab;
    if (!grab) return;
    const body = this.bodies[grab.body];
    for (let k = 0; k < grab.indices.length; k++) {
      const i = grab.indices[k];
      const w = grab.weights[k] * GRAB_K;
      body.x[i] += (this.pointerX + grab.offX[k] - body.x[i]) * w;
      body.y[i] += (this.pointerY + grab.offY[k] - body.y[i]) * w;
    }
    if (body.state === "anchored") {
      const pulled = Math.hypot(this.pointerX - grab.startX, this.pointerY - grab.startY);
      if (pulled > this.unit * POP_DISTANCE) {
        body.state = "loose";
        body.timer = 0;
      }
    } else if (body.state === "returning") {
      body.state = "loose";
      body.timer = 0;
    }
  }

  private applyHome(body: Body, h: number): void {
    const grabbed = this.grab !== null && this.bodies[this.grab.body] === body;

    if (body.state === "loose") {
      if (grabbed) return;
      body.timer += h;
      if (body.timer > RETURN_DELAY) {
        body.state = "returning";
        body.timer = 0;
        // A little hop to start the trip home.
        const hop = HOP_SPEED * h;
        for (let i = 0; i < body.y.length; i++) body.py[i] = body.y[i] + hop;
      }
      return;
    }

    let k = ANCHOR_K;
    if (body.state === "returning") {
      body.timer += h;
      k = RETURN_K * Math.min(1, body.timer / 0.6);
      const [cx, cy] = centre(body);
      if (body.timer > 0.6 && Math.hypot(cx - body.homeX, cy - body.homeY) < body.height * 0.05) {
        body.state = "anchored";
      }
    }

    // Idle breathing: a slow squash and stretch around the home pose.
    const breath = body.state === "anchored" && !grabbed ? Math.sin(this.time * 2.2 + body.phase) * BREATH : 0;
    const sx = 1 - breath * 0.6;
    const sy = 1 + breath;
    const base = body.homeY + body.height * 0.5;
    for (let i = 0; i < body.x.length; i++) {
      const tx = body.homeX + body.qx[i] * sx;
      // Breathe from the baseline so letters do not float.
      const ty = base + (body.homeY + body.qy[i] - base) * sy;
      body.x[i] += (tx - body.x[i]) * k;
      body.y[i] += (ty - body.y[i]) * k;
    }
  }

  private collideBodies(): void {
    const r2 = this.radius * 2;
    const r2sq = r2 * r2;
    for (let a = 0; a < this.bodies.length; a++) {
      const A = this.bodies[a];
      for (let b = a + 1; b < this.bodies.length; b++) {
        const B = this.bodies[b];
        if (A.state === "anchored" && B.state === "anchored") continue;
        if (A.maxX + r2 < B.minX || B.maxX + r2 < A.minX || A.maxY + r2 < B.minY || B.maxY + r2 < A.minY) continue;
        for (let i = 0; i < A.x.length; i++) {
          const ax = A.x[i];
          const ay = A.y[i];
          if (ax < B.minX - r2 || ax > B.maxX + r2 || ay < B.minY - r2 || ay > B.maxY + r2) continue;
          for (let j = 0; j < B.x.length; j++) {
            const dx = B.x[j] - ax;
            const dy = B.y[j] - ay;
            const dsq = dx * dx + dy * dy;
            if (dsq >= r2sq || dsq === 0) continue;
            const d = Math.sqrt(dsq);
            const push = (r2 - d) / d / 2;
            A.x[i] -= dx * push;
            A.y[i] -= dy * push;
            B.x[j] += dx * push;
            B.y[j] += dy * push;
          }
        }
      }
    }
  }

  private collideBounds(body: Body): void {
    const r = this.radius;
    const right = this.width - r;
    const bottom = this.height - r;
    for (let i = 0; i < body.x.length; i++) {
      const vx = body.x[i] - body.px[i];
      const vy = body.y[i] - body.py[i];
      if (body.y[i] > bottom) {
        body.y[i] = bottom;
        body.py[i] = bottom + vy * RESTITUTION;
        body.px[i] = body.x[i] - vx * FRICTION;
      } else if (body.y[i] < r) {
        body.y[i] = r;
        body.py[i] = r + vy * RESTITUTION;
      }
      if (body.x[i] > right) {
        body.x[i] = right;
        body.px[i] = right + vx * RESTITUTION;
      } else if (body.x[i] < r) {
        body.x[i] = r;
        body.px[i] = r + vx * RESTITUTION;
      }
    }
  }
}

function buildBody(glyph: LayoutGlyph, spacing: number, index: number): Body {
  const xs: number[] = [];
  const ys: number[] = [];
  const contours: number[][] = [];

  for (const contour of glyph.contours) {
    const ids: number[] = [];
    for (const [x, y] of resample(contour, spacing)) {
      ids.push(xs.length);
      xs.push(x);
      ys.push(y);
    }
    contours.push(ids);
  }

  // Interior grid so the letter has some body to it.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < xs.length; i++) {
    minX = Math.min(minX, xs[i]);
    maxX = Math.max(maxX, xs[i]);
    minY = Math.min(minY, ys[i]);
    maxY = Math.max(maxY, ys[i]);
  }
  const outline = xs.length;
  for (let y = minY + spacing / 2; y < maxY; y += spacing) {
    for (let x = minX + spacing / 2; x < maxX; x += spacing) {
      if (!pointInContours(glyph.contours, x, y)) continue;
      let clear = true;
      for (let i = 0; i < outline && clear; i++) {
        clear = Math.hypot(xs[i] - x, ys[i] - y) > spacing * 0.6;
      }
      if (clear) {
        xs.push(x);
        ys.push(y);
      }
    }
  }

  const n = xs.length;
  let cx = 0, cy = 0;
  for (let i = 0; i < n; i++) {
    cx += xs[i];
    cy += ys[i];
  }
  cx /= n;
  cy /= n;

  const links: number[] = [];
  const rest: number[] = [];
  const reach = spacing * 1.9;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(xs[i] - xs[j], ys[i] - ys[j]);
      if (d < reach) {
        links.push(i, j);
        rest.push(d);
      }
    }
  }

  const body: Body = {
    x: Float64Array.from(xs),
    y: Float64Array.from(ys),
    px: Float64Array.from(xs),
    py: Float64Array.from(ys),
    qx: Float64Array.from(xs, (v) => v - cx),
    qy: Float64Array.from(ys, (v) => v - cy),
    homeX: cx,
    homeY: cy,
    links: Int32Array.from(links),
    linkRest: Float64Array.from(rest),
    contours,
    state: "anchored",
    timer: 0,
    phase: index * 1.3,
    height: maxY - minY,
    minX,
    minY,
    maxX,
    maxY,
  };
  return body;
}

function resample(contour: [number, number][], spacing: number): [number, number][] {
  const n = contour.length;
  const lengths = [0];
  for (let i = 1; i <= n; i++) {
    const [ax, ay] = contour[i - 1];
    const [bx, by] = contour[i % n];
    lengths.push(lengths[i - 1] + Math.hypot(bx - ax, by - ay));
  }
  const total = lengths[n];
  const count = Math.max(6, Math.round(total / spacing));
  const out: [number, number][] = [];
  let seg = 0;
  for (let k = 0; k < count; k++) {
    const target = (k / count) * total;
    while (lengths[seg + 1] < target) seg++;
    const [ax, ay] = contour[seg];
    const [bx, by] = contour[(seg + 1) % n];
    const span = lengths[seg + 1] - lengths[seg] || 1;
    const t = (target - lengths[seg]) / span;
    out.push([ax + (bx - ax) * t, ay + (by - ay) * t]);
  }
  return out;
}

function solveLinks(body: Body): void {
  const { x, y, links, linkRest } = body;
  for (let l = 0; l < linkRest.length; l++) {
    const i = links[l * 2];
    const j = links[l * 2 + 1];
    const dx = x[j] - x[i];
    const dy = y[j] - y[i];
    const d = Math.hypot(dx, dy) || 1e-6;
    const r = linkRest[l];
    // Gummy candy gives a little, then firms up.
    const limit = r * MAX_STRETCH;
    const target = d > limit ? limit : r;
    const k = d > limit ? 1 : LINK_K;
    const c = ((d - target) / d) * 0.5 * k;
    x[i] += dx * c;
    y[i] += dy * c;
    x[j] -= dx * c;
    y[j] -= dy * c;
  }
}

/** Pulls particles towards the best rigid fit of the rest shape. */
function matchShape(body: Body, k: number): void {
  const { x, y, qx, qy } = body;
  const n = x.length;
  const [cx, cy] = centre(body);
  let a = 0;
  let b = 0;
  for (let i = 0; i < n; i++) {
    const px = x[i] - cx;
    const py = y[i] - cy;
    a += px * qx[i] + py * qy[i];
    b += py * qx[i] - px * qy[i];
  }
  const len = Math.hypot(a, b) || 1;
  const cos = a / len;
  const sin = b / len;
  for (let i = 0; i < n; i++) {
    const gx = cx + qx[i] * cos - qy[i] * sin;
    const gy = cy + qx[i] * sin + qy[i] * cos;
    x[i] += (gx - x[i]) * k;
    y[i] += (gy - y[i]) * k;
  }
}

export function centre(body: Body): [number, number] {
  let cx = 0;
  let cy = 0;
  const n = body.x.length;
  for (let i = 0; i < n; i++) {
    cx += body.x[i];
    cy += body.y[i];
  }
  return [cx / n, cy / n];
}

function updateBounds(body: Body): void {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < body.x.length; i++) {
    const x = body.x[i];
    const y = body.y[i];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  body.minX = minX;
  body.minY = minY;
  body.maxX = maxX;
  body.maxY = maxY;
}

function pointInBody(body: Body, x: number, y: number): boolean {
  let inside = false;
  for (const ids of body.contours) {
    for (let k = 0, m = ids.length - 1; k < ids.length; m = k++) {
      const xi = body.x[ids[k]];
      const yi = body.y[ids[k]];
      const xj = body.x[ids[m]];
      const yj = body.y[ids[m]];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

function pointInContours(contours: [number, number][][], x: number, y: number): boolean {
  let inside = false;
  for (const c of contours) {
    for (let k = 0, m = c.length - 1; k < c.length; m = k++) {
      const [xi, yi] = c[k];
      const [xj, yj] = c[m];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}
