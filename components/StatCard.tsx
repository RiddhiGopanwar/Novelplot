export default function StatCard({
  label,
  value,
  emoji,
}: {
  label: string;
  value: string | number;
  emoji?: string;
}) {
  return (
    <div className="card flex flex-col items-start gap-1 p-5">
      {emoji && <span className="text-2xl">{emoji}</span>}
      <span className="font-display text-3xl font-bold text-plum">{value}</span>
      <span className="font-mono text-xs uppercase tracking-wide text-plum-soft">{label}</span>
    </div>
  );
}
