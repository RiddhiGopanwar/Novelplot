export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <path
        d="M 108 20 L 132 20 L 132 78 L 120 68 L 108 78 Z"
        fill="#80AEE8"
        stroke="#5B0015"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M 30 68 C 30 54 55 44 116 50 L 116 176 C 65 170 30 178 30 194 Z"
        fill="#FBF8EF"
        stroke="#5B0015"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 210 68 C 210 54 185 44 124 50 L 124 176 C 175 170 210 178 210 194 Z"
        fill="#FBF8EF"
        stroke="#5B0015"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="120" y1="52" x2="120" y2="174" stroke="#5B0015" strokeWidth="3" strokeLinecap="round" />
      <path d="M 46 76 C 70 70 96 72 108 78" fill="none" stroke="#5B0015" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M 46 96 C 70 90 96 92 108 98" fill="none" stroke="#5B0015" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M 46 116 C 70 110 96 112 108 118" fill="none" stroke="#5B0015" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M 194 76 C 170 70 144 72 132 78" fill="none" stroke="#5B0015" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M 194 96 C 170 90 144 92 132 98" fill="none" stroke="#5B0015" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M 194 116 C 170 110 144 112 132 118" fill="none" stroke="#5B0015" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path
        d="M 196 46 L 200 34 L 204 46 L 216 50 L 204 54 L 200 66 L 196 54 L 184 50 Z"
        fill="#5B0015"
        stroke="#FBF8EF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
