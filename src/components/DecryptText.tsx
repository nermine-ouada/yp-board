"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function DecryptText({
  text,
  delay = 0,
  duration = 550,
  as: Tag = "span",
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || started.current) return;
    started.current = true;
    let raf = 0;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const locked = Math.floor(t * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          out +=
            text[i] === " "
              ? " "
              : i < locked
              ? text[i]
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);
        if (t < 1) raf = requestAnimationFrame(frame);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(frame);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [reduced, text, delay, duration]);

  return <Tag className={className}>{display}</Tag>;
}
