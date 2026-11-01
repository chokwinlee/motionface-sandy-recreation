export const ToolIcon: React.FC<{ kind: number; size?: number }> = ({
  kind,
  size = 22,
}) => {
  const glyphs = [
    <g key="nib">
      <path d="m4 18 3-11 7-4 6 6-4 7-12 4 7-8" />
      <circle cx="12" cy="11" r="2" />
      <path d="m14 3 6 6" />
    </g>,
    <g key="move">
      <path d="M12 2v20M2 12h20m-13-7 3-3 3 3m-6 14 3 3 3-3M5 9l-3 3 3 3m14-6 3 3-3 3" />
    </g>,
    <path key="cursor" d="m5 2 15 11-8 1-4 7Z" fill="currentColor" />,
    <g key="type">
      <path d="M3 4h18M12 4v17M8 21h8M3 4v4m18-4v4" />
      <path d="M16 11h7m-3-1v11m-2 0h4" strokeWidth="1" />
    </g>,
    <g key="brush">
      <path d="m19 3 2 2-10 11-3-3Z" fill="currentColor" />
      <path d="M9 15c-5-1-3 4-7 5 5 2 9 0 7-5Z" fill="currentColor" />
    </g>,
    <path
      key="pin"
      d="m15 2 7 7-5 1-3 5-3-1-7 8 5-10-1-3 5-3Z"
      fill="currentColor"
    />,
    <g key="orbit">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </g>,
    <g key="rotate">
      <path d="M5 8a8 8 0 0 1 14 0m0 8a8 8 0 0 1-14 0M5 3v5H1m18 13v-5h4" />
    </g>,
    <path key="square" d="M3 3h18v18H3Z" fill="currentColor" />,
    <g key="transform">
      <path d="M4 4h16v16H4Z" />
      <path
        d="M2 2h4v4H2Zm16 0h4v4h-4ZM2 18h4v4H2Zm16 0h4v4h-4Z"
        fill="currentColor"
      />
    </g>,
    <g key="eraser" transform="rotate(-45 12 12)">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M7 15h10" />
      <path d="M9 5v7m6-7v7" strokeWidth="2" />
    </g>,
    <path
      key="home"
      d="m2 11 10-9 10 9h-4v11h-5v-8h-3v8H5V11Z"
      fill="currentColor"
    />,
    <path key="triangle" d="M12 2 23 22H1Z" fill="currentColor" />,
    <g key="search">
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 7 7" />
    </g>,
    <g key="spacing">
      <path
        d="M2 7h19m-3-3 3 3-3 3M22 17H3m3-3-3 3 3 3"
        strokeDasharray="2 2"
      />
    </g>,
    <g key="frame">
      <path d="M2 7V2h5m10 0h5v5M2 17v5h5m10 0h5v-5M6 6h12m-6 0v13m-3 0h6" />
    </g>,
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      {glyphs[((kind % glyphs.length) + glyphs.length) % glyphs.length]}
    </svg>
  );
};
