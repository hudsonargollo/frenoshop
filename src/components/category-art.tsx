/** Line icons for catalog category tiles. */

type Props = { className?: string };

function BrakePad({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M30 44c0-8 6-14 14-14h32c8 0 14 6 14 14v32c0 8-6 14-14 14H44c-8 0-14-6-14-14V44z" strokeLinejoin="round" />
      <path d="M38 36h44v10c0 4-3 7-7 7H45c-4 0-7-3-7-7V36z" strokeLinejoin="round" opacity="0.75" />
      <circle cx="49" cy="72" r="4" />
      <circle cx="71" cy="72" r="4" />
      <path d="M42 86h36" strokeLinecap="round" opacity="0.55" />
      <path d="M26 58h-8M94 58h8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function Disc({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="40" />
      <circle cx="60" cy="60" r="26" opacity="0.8" />
      <circle cx="60" cy="60" r="10" />
      <circle cx="60" cy="60" r="3" />
      <path d="M60 20v9M60 91v9M20 60h9M91 60h9M32 32l6 6M82 82l6 6M88 32l-6 6M38 82l-6 6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function Cylinder({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M40 34h40v52c0 6-5 11-11 11H51c-6 0-11-5-11-11V34z" strokeLinejoin="round" />
      <path d="M40 48h40" opacity="0.7" />
      <path d="M48 34V24c0-3 2-5 5-5h14c3 0 5 2 5 5v10" strokeLinejoin="round" />
      <circle cx="60" cy="80" r="7" />
      <path d="M34 60H22M86 60h12" strokeLinecap="round" opacity="0.5" />
      <path d="M52 80h16" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function Seals({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="38" />
      <circle cx="60" cy="60" r="28" opacity="0.85" />
      <circle cx="60" cy="60" r="18" opacity="0.7" />
      <circle cx="60" cy="60" r="8" />
      <path d="M22 60h-8M98 60h8M60 22v-8M60 98v8" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function Hose({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M32 28v24c0 16 12 28 28 28s28-12 28-28V28" strokeLinejoin="round" />
      <path d="M26 28h12M82 28h12" strokeLinecap="round" />
      <path d="M60 66c0-8 9-12 9-20 0 8 9 12 9 20a9 9 0 0 1-18 0z" strokeLinejoin="round" opacity="0.9" />
      <path d="M60 88v8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function Wrench({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M76 24a22 22 0 0 0-19 32L30 83a8 8 0 0 0 11 11l27-27a22 22 0 0 0 32-19l-13 8-11-11 8-13a22 22 0 0 0-8-8z" strokeLinejoin="round" />
      <circle cx="35" cy="89" r="3" />
    </svg>
  );
}

const MAP: Record<string, (p: Props) => React.ReactElement> = {
  "pastillas-de-freno": BrakePad,
  "discos-y-tambores": Disc,
  "cilindros-y-bombas": Cylinder,
  "kits-y-sellos": Seals,
  "mangueras-y-liquidos": Hose,
  accesorios: Wrench,
};

export function CategoryArt({ slug, className }: { slug: string; className?: string }) {
  const Art = MAP[slug] ?? Disc;
  return <Art className={className} />;
}
