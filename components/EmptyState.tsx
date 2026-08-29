export default function EmptyState({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-display text-xl text-plum">{title}</h3>
      <p className="max-w-sm text-sm text-plum-soft">{description}</p>
    </div>
  );
}
