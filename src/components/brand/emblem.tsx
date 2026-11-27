// The store's brand mark — the FRENOSHOP disc icon. `SunMark` is the line-art
// brake disc used for faint decorative watermarks where the full-colour mark
// would be too heavy.

type MarkProps = {
  size?: number;
  className?: string;
  /** Kept for call sites that still pass a colour; the logo carries its own. */
  color?: string;
  /** Highlight used by the disc watermark (vents and hub). */
  accent?: string;
};

export function Emblem({ size = 44, className = "" }: MarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/frenoshop-icon.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 rounded-[22%] object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function SunMark({
  size = 44,
  className = "",
  color = "currentColor",
  accent = "var(--color-accent)",
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* outer disc */}
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="3.2" />
      {/* friction face */}
      <circle cx="32" cy="32" r="19" stroke={accent} strokeWidth="2.6" />
      {/* vents */}
      <path
        d="M32 5v6M32 53v6M5 32h6M53 32h6M13 13l4 4M47 47l4 4M51 13l-4 4M17 47l-4 4"
        stroke={accent}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* hub + bolts */}
      <circle cx="32" cy="32" r="7" stroke={accent} strokeWidth="3" />
      <circle cx="32" cy="28.5" r="1.2" fill={accent} />
      <circle cx="35" cy="32" r="1.2" fill={accent} />
      <circle cx="32" cy="35.5" r="1.2" fill={accent} />
      <circle cx="29" cy="32" r="1.2" fill={accent} />
    </svg>
  );
}
