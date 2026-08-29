"use client";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-plum/40 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-sm p-6 text-center">
        <h3 className="font-display text-xl text-plum">{title}</h3>
        <p className="mt-2 text-sm text-plum-soft">{description}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-full border-2 border-plum bg-paper px-5 py-2 text-sm font-bold text-plum shadow-pop-sm hover:bg-red-soft/40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full border-2 border-plum bg-red px-5 py-2 text-sm font-bold text-plum shadow-pop-sm hover:-translate-y-0.5"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
