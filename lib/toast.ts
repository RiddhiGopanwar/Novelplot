"use client";

export type ToastMessage = { id: string; text: string; kind: "success" | "error" };

type Listener = (toast: ToastMessage) => void;
const listeners = new Set<Listener>();

export function onToast(listener: Listener) {
  listeners.add(listener);
  return () => {
  listeners.delete(listener);
};
}

export function showToast(text: string, kind: ToastMessage["kind"] = "success") {
  const toast: ToastMessage = { id: `t_${Date.now()}_${Math.random()}`, text, kind };
  listeners.forEach((l) => l(toast));
}
