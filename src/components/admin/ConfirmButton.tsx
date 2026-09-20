"use client";
import { useFormStatus } from "react-dom";

export function ConfirmButton({
  children,
  className,
  confirmMessage,
}: {
  children: React.ReactNode;
  className?: string;
  confirmMessage: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {pending ? "Working…" : children}
    </button>
  );
}
