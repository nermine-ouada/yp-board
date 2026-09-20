"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);

  if (totalSeconds < 3600) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")} left`;
  }

  if (totalSeconds < 86400) {
    // Round up to the next minute so it doesn't sit one tick below a whole
    // hour right after login (e.g. showing "3h 59m" instantly instead of "4h 0m").
    const totalMinutes = Math.ceil(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m left`;
  }

  // Round up to the next hour so a fresh multi-day session reads "7d 0h left"
  // instead of dropping to "6d 23h left" a second after logging in.
  const totalHours = Math.ceil(totalSeconds / 3600);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `${days}d ${hours}h left`;
}

export function SessionTimer({ expiresAt }: { expiresAt: number }) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(() => expiresAt - Date.now());

  useEffect(() => {
    const tick = () => {
      const next = expiresAt - Date.now();
      setRemaining(next);
      if (next <= 0) router.push("/admin/login?expired=1");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt, router]);

  const isLow = remaining < 5 * 60 * 1000;

  return (
    <div
      title="Time left before you're automatically logged out"
      style={{
        position: "fixed",
        top: "calc(10px + env(safe-area-inset-top, 0px))",
        right: 12,
        zIndex: 40,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11,
        fontWeight: 700,
        padding: "4px 9px",
        borderRadius: 4,
        border: `1px solid ${isLow ? "var(--stamp-open)" : "var(--line)"}`,
        background: isLow ? "var(--stamp-open)" : "#fff",
        color: isLow ? "#fff" : "var(--muted)",
        boxShadow: "0 4px 10px -4px rgba(0, 0, 0, .25)",
      }}
    >
      {formatRemaining(remaining)}
    </div>
  );
}
