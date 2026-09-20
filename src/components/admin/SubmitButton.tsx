"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingLabel,
  style,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  style?: React.CSSProperties;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="apply-btn"
      disabled={pending}
      style={{ ["--accent" as string]: "var(--blue)", ...style }}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
