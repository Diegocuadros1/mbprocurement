// Marketing-site inline SVGs, ported from the design system. stroke="currentColor"
// so they inherit the surrounding color (accent inside .pi, dark on points).

export function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Pi({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export const IconTag = () => (
  <Pi>
    <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8z" />
    <path d="M7.5 7.5h.01" />
  </Pi>
);

export const IconShieldCheck = () => (
  <Pi>
    <path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7z" />
    <path d="M9 12l2 2 4-4" />
  </Pi>
);

export const IconDoc = () => (
  <Pi>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M8 13h8M8 17h5" />
  </Pi>
);

export const IconChart = () => (
  <Pi>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </Pi>
);

export const IconDollar = () => (
  <Pi>
    <path d="M12 1v22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Pi>
);

export const IconFlask = () => (
  <Pi>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
  </Pi>
);

export const IconBuilding = () => (
  <Pi>
    <path d="M3 21h18M5 21V8l7-4 7 4v13M9 12h.01M9 16h.01M15 12h.01M15 16h.01" />
  </Pi>
);

export const IconOS = () => (
  <Pi>
    <path d="M3 5h18v11H3z" />
    <path d="M8 21h8M12 16v5M7 10l2 2 5-5" />
  </Pi>
);

export const IconClock = () => (
  <Pi>
    <path d="M12 7v5l3 2" />
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </Pi>
);

// Vendor logos shown on the marketing pages (filename + alt).
export const VENDOR_LOGOS: Array<{ src: string; alt: string }> = [
  { src: "/pw/vendors/thermo-fisher.png", alt: "Thermo Fisher" },
  { src: "/pw/vendors/fisher-scientific.png", alt: "Fisher Scientific" },
  { src: "/pw/vendors/abcam.png", alt: "Abcam" },
  { src: "/pw/vendors/agilent.png", alt: "Agilent" },
  { src: "/pw/vendors/biorad.png", alt: "Bio-Rad" },
  { src: "/pw/vendors/cell-signaling.png", alt: "Cell Signaling Technology" },
  { src: "/pw/vendors/genscript.avif", alt: "GenScript" },
  { src: "/pw/vendors/takara.webp", alt: "Takara Bio" },
  { src: "/pw/vendors/stemcell.png", alt: "STEMCELL Technologies" },
  { src: "/pw/vendors/beckman-coulter.png", alt: "Beckman Coulter" },
  { src: "/pw/vendors/goldbio.webp", alt: "GoldBio" },
  { src: "/pw/vendors/amsbio.png", alt: "AMSBIO" },
];
