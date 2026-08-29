export default function ProgressBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-red-soft/50">
      <div
        className="h-full rounded-full bg-gradient-to-r from-red-deep to-red transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
