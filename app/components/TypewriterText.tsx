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
  });

  useEffect(() => {
    const { text, phraseIdx, isDeleting } = state;
    const phrase = ROLES[phraseIdx];

    // A finished phrase lingers before it starts deleting.
    const isComplete = !isDeleting && text.length === phrase.length;
    const delay = isComplete
      ? PAUSE_MS
      : isDeleting
        ? DELETE_SPEED
        : TYPE_SPEED;

    const t = setTimeout(() => {
      setState((s) => {
        const current = ROLES[s.phraseIdx];

        if (!s.isDeleting) {
          return s.text.length < current.length
            ? { ...s, text: current.slice(0, s.text.length + 1) }
            : { ...s, isDeleting: true };
        }

        return s.text.length > 0
          ? { ...s, text: s.text.slice(0, -1) }
          : {
              ...s,
              isDeleting: false,
              phraseIdx: (s.phraseIdx + 1) % ROLES.length,
            };
      });
    }, delay);

    return () => clearTimeout(t);
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
