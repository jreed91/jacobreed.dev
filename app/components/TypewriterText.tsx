"use client";
import { useEffect, useState } from "react";

const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Engineer",
  "Technical Lead",
  "Problem Solver",
];

const TYPE_SPEED = 95;
const DELETE_SPEED = 45;
const PAUSE_MS = 2200;

export default function TypewriterText() {
  const [state, setState] = useState({
    text: "",
    phraseIdx: 0,
    isDeleting: false,
    isPaused: false,
  });

  useEffect(() => {
    const { text, phraseIdx, isDeleting, isPaused } = state;
    const phrase = ROLES[phraseIdx];

    if (isPaused) {
      const t = setTimeout(
        () => setState((s) => ({ ...s, isPaused: false, isDeleting: true })),
        PAUSE_MS
      );
      return () => clearTimeout(t);
    }

    if (!isDeleting) {
      if (text.length < phrase.length) {
        const t = setTimeout(
          () =>
            setState((s) => ({
              ...s,
              text: phrase.slice(0, s.text.length + 1),
            })),
          TYPE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setState((s) => ({ ...s, isPaused: true })), 0);
        return () => clearTimeout(t);
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(
          () =>
            setState((s) => ({ ...s, text: s.text.slice(0, -1) })),
          DELETE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setState((s) => ({
          ...s,
          isDeleting: false,
          phraseIdx: (s.phraseIdx + 1) % ROLES.length,
        })), 0);
        return () => clearTimeout(t);
      }
    }
  }, [state]);

  return (
    <span className="inline-flex items-center gap-1">
      <span>{state.text}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-current align-middle animate-[blink_1s_step-end_infinite]"
        aria-hidden="true"
      />
    </span>
  );
}
