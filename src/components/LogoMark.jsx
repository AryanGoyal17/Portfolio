/**
 * Original geometric mark for Aryan Goyal.
 * A precision-crafted geometric monogram integrating 'A' (ascending chevron)
 * and 'G' (horizontal return and dynamic anchor) with architectural nodes.
 */
export default function LogoMark({ className = "w-7 h-7", id = "brand-logo-mark" }) {
  return (
    <svg
      id={id}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Aryan Goyal Logo"
    >
      {/* Outer subtle geometric bounding boundary */}
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="9"
        className="stroke-border"
        strokeWidth="1.5"
      />
      {/* Main geometric 'A' chevron ascending */}
      <path
        d="M12 28L20 12L28 28"
        className="stroke-foreground"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Interlocking 'G' technical crossbar and return */}
      <path
        d="M16 23H25C26.1046 23 27 23.8954 27 25V25.5C27 26.8807 25.8807 28 24.5 28H19.5"
        className="stroke-accent"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central apex pulse point */}
      <circle cx="20" cy="12" r="1.75" className="fill-accent" />
    </svg>
  );
}
