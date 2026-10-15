import { describe, expect, it } from "vitest";
import { layoutWord } from "./wordLayout";
import { GummySim, centre } from "./sim";

const WIDTH = 900;
const HEIGHT = 520;

function makeSim(): GummySim {
  return new GummySim(layoutWord(200, 150, 90), WIDTH, HEIGHT, 7);
}

function run(sim: GummySim, seconds: number): void {
  for (let t = 0; t < seconds; t += 1 / 60) sim.step(1 / 60);
}

function drift(sim: GummySim, b: number): number {
  const body = sim.bodies[b];
  const [cx, cy] = centre(body);
  return Math.hypot(cx - body.homeX, cy - body.homeY);
}

describe("GummySim", () => {
  it("builds one body per letter", () => {
    const sim = makeSim();
    expect(sim.bodies).toHaveLength(5);
    for (const body of sim.bodies) {
      expect(body.x.length).toBeGreaterThan(20);
      expect(body.contours.length).toBeGreaterThan(0);
    }
  });

  it("keeps anchored letters at home", () => {
    const sim = makeSim();
    run(sim, 5);
    for (let b = 0; b < sim.bodies.length; b++) {
      expect(sim.bodies[b].state).toBe("anchored");
      expect(drift(sim, b)).toBeLessThan(2);
    }
  });

  it("jiggles back after a short tug", () => {
    const sim = makeSim();
    const o = sim.bodies[3];
    const [cx, cy] = centre(o);
    expect(sim.press(o.minX + 3, cy)).toBe(true);
    for (let i = 0; i < 10; i++) {
      sim.move(cx, cy + 20, 0, 2);
      sim.step(1 / 60);
    }
    sim.release();
    expect(sim.bodies[3].state).toBe("anchored");
    run(sim, 4);
    expect(drift(sim, 3)).toBeLessThan(2);
  });

  it("pops loose when pulled far, stays in bounds, then returns home", () => {
    const sim = makeSim();
    const j = sim.bodies[0];
    const [cx, cy] = centre(j);
    expect(sim.press(cx, cy)).toBe(true);
    for (let i = 0; i < 40; i++) {
      sim.move(cx + i * 6, cy + i * 4, 6, 4);
      sim.step(1 / 60);
    }
    expect(j.state).toBe("loose");
    sim.release();

    run(sim, 1.5);
    expect(j.state).toBe("loose");
    for (let i = 0; i < j.x.length; i++) {
      expect(j.x[i]).toBeGreaterThanOrEqual(0);
      expect(j.x[i]).toBeLessThanOrEqual(WIDTH);
      expect(j.y[i]).toBeGreaterThanOrEqual(0);
      expect(j.y[i]).toBeLessThanOrEqual(HEIGHT);
    }

    run(sim, 8);
    expect(j.state).toBe("anchored");
    expect(drift(sim, 0)).toBeLessThan(3);
  });

  it("does not grab empty space", () => {
    const sim = makeSim();
    expect(sim.press(10, 10)).toBe(false);
    expect(sim.grabbing).toBe(false);
  });

  it("stays finite when a letter is flung hard", () => {
    const sim = makeSim();
    const b = sim.bodies[4];
    const [cx, cy] = centre(b);
    sim.press(cx, cy);
    for (let i = 0; i < 20; i++) {
      sim.move(cx - i * 40, cy - i * 20, -40, -20);
      sim.step(1 / 60);
    }
    sim.release();
    run(sim, 3);
    for (const body of sim.bodies) {
      for (let i = 0; i < body.x.length; i++) {
        expect(Number.isFinite(body.x[i])).toBe(true);
        expect(Number.isFinite(body.y[i])).toBe(true);
      }
    }
  });
});
