import { Quote } from "@/lib/types";

export default function QuoteCard({
  quote,
  onEdit,
  onDelete,
}: {
  quote: Quote;
  onEdit?: () => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="card relative flex flex-col gap-3 p-6">
      <span className="pointer-events-none absolute -top-3 left-5 font-display text-5xl text-red-deep/60">
        &ldquo;
      </span>
      <p className="font-display text-lg italic leading-relaxed text-plum">
        {quote.text}
      </p>
      <div className="flex items-center justify-between text-sm text-plum-soft">
        <span>
          from {quote.book}, by {quote.author}
          {quote.page ? ` (p. ${quote.page})` : ""}
        </span>
        <div className="flex gap-3">
          {onEdit && (
            <button onClick={onEdit} className="text-xs text-plum-soft/70 hover:text-plum">
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(quote.id)}
              className="text-xs text-plum-soft/60 hover:text-red"
              aria-label="Delete quote"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
