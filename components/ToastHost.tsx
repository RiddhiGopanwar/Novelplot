"use client";

import { useEffect, useState } from "react";
import { onToast, ToastMessage } from "@/lib/toast";

export default function ToastHost() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return onToast((toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 2800);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-full px-5 py-2.5 text-sm font-semibold shadow-soft ${
            t.kind === "success" ? "bg-plum text-cream" : "bg-red text-plum"
          }`}
        >
          {t.kind === "success" ? "✓ " : "⚠ "}
          {t.text}
        </div>
      ))}
    </div>
  );
}
