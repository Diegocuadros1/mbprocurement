// ProcureWide portal design tokens (JS mirror of the CSS foundations), used by
// the inline-styled portal components ported from the design prototype.

export const PW = {
  ink: "#07112A",
  ink700: "#14224A",
  ink500: "#2A3A66",
  green: "#0E9560",
  green700: "#0A7048",
  green50: "#ECF8F1",
  white: "#FFFFFF",
  paper: "#FAFBF7",
  paper2: "#F2F3EE",
  line: "#E3E5DE",
  line2: "#C8CCC1",
  mute: "#6B7280",
  sans: 'var(--font-jakarta), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
  display: 'var(--font-bricolage), var(--font-jakarta), ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-jbmono), ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  shadowSm: "0 1px 2px rgba(10,21,48,0.05), 0 1px 1px rgba(10,21,48,0.04)",
  shadowMd: "0 6px 16px -6px rgba(10,21,48,0.12), 0 2px 4px rgba(10,21,48,0.04)",
} as const;

export const SLDS_BLUE = "#1B96FF";
export const SLDS_BLUE_HOVER = "#0F7BD1";
