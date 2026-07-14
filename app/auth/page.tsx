"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { signUpAction, loginAction } from "./actions";

/* ── Design ported from the new site's "Log In" page. Auth logic (Supabase
   loginAction / signUpAction) is the existing, working implementation. ── */

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    companyKey: z.string().min(6, "Company key is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/areas-we-serve", label: "Areas we serve" },
  { href: "/labs-we-support", label: "Labs we support" },
  { href: "/prodigy-labs", label: "Prodigy Labs" },
];

const GREEN_BTN: React.CSSProperties = {
  background: "linear-gradient(180deg,#3FCF8A 0%,#14B06E 48%,#0C7F4C 52%,#0A6B3F 100%)",
  border: "1px solid #0A5C3C",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 6px rgba(10,21,48,0.18)",
  color: "#FFFFFF",
  fontFamily: "var(--pw-font-sans)",
  fontSize: 15,
  fontWeight: 600,
  padding: "14px 22px",
  borderRadius: 8,
  cursor: "pointer",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const INPUT: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  fontFamily: "var(--pw-font-sans)",
  fontSize: 14,
  color: "var(--pw-ink)",
  background: "#FFFFFF",
  border: "1px solid var(--pw-line-2)",
  borderRadius: 8,
  outline: "none",
};

const FIELD_LABEL: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--pw-ink-500)",
  marginBottom: 6,
};

const errText: React.CSSProperties = { display: "block", marginTop: 6, fontSize: 12, color: "#B5384A", fontWeight: 500 };

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", companyKey: "", password: "", confirmPassword: "" });

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    if (formError) setFormError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError("");
    const r = loginSchema.safeParse({ email: form.email, password: form.password });
    if (!r.success) {
      const fe: Record<string, string> = {};
      r.error.issues.forEach((i) => i.path[0] && (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.set("email", form.email);
    fd.set("password", form.password);
    const res = await loginAction(fd);
    if (res.error) {
      setFormError("Invalid email or password. Please try again.");
      setBusy(false);
      return;
    }
    toast({ title: "Login successful", description: "Welcome back!" });
    router.replace("/app");
    router.refresh();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError("");
    const r = signupSchema.safeParse(form);
    if (!r.success) {
      const fe: Record<string, string> = {};
      r.error.issues.forEach((i) => i.path[0] && (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("email", form.email);
    fd.set("password", form.password);
    fd.set("companyKey", form.companyKey);
    const res = await signUpAction(fd);
    if (res.error) {
      setFormError(res.error);
      setBusy(false);
      return;
    }
    setEmailConfirm(true);
    setBusy(false);
  };

  const switchMode = () => {
    setIsLogin((v) => !v);
    setErrors({});
    setFormError("");
    setForm({ name: "", email: "", companyKey: "", password: "", confirmPassword: "" });
  };

  const ErrorAlert = () =>
    formError ? (
      <div role="alert" style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16, padding: "10px 12px", background: "#F7E2E5", border: "1px solid #E4B8BF", borderRadius: 8 }}>
        <span style={{ flex: "none", width: 16, height: 16, borderRadius: 999, background: "#B5384A", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>!</span>
        <span style={{ fontSize: 13, lineHeight: 1.45, color: "#7A2230" }}>{formError}</span>
      </div>
    ) : null;

  const Spinner = () => (
    <span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.45)", borderTopColor: "#fff", borderRadius: 999, display: "inline-block", animation: "pw-spin 0.7s linear infinite" }} />
  );

  return (
    <div style={{ background: "var(--pw-paper)", color: "var(--pw-ink)", fontFamily: "var(--pw-font-sans)" }}>
      {/* ── Nav ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,251,247,0.78)", backdropFilter: "blur(14px) saturate(140%)", borderBottom: "1px solid var(--pw-line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--pw-ink)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pw/logo.png" width={30} height={30} alt="ProcureWide logo" style={{ display: "block" }} />
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>ProcureWide</span>
          </Link>
          <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14, fontWeight: 500, color: "var(--pw-ink)" }}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} style={{ borderBottom: "1px solid transparent", padding: "2px 0" }}>
                {n.label}
              </Link>
            ))}
            <span style={{ borderBottom: "1px solid var(--pw-ink)", padding: "2px 0" }}>Log in</span>
            <Link href="/submit-order" style={{ background: "linear-gradient(180deg,#14B06E 0%,#10A060 45%,#0C7F4C 100%)", border: "1px solid #0A6B47", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(10,21,48,0.2)", color: "#FFFFFF", fontSize: 13.5, fontWeight: 600, padding: "9px 18px", borderRadius: 6 }}>
              Submit an order
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Main card ── */}
      <main style={{ minHeight: "calc(100vh - 61px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "72px 40px" }}>
        <div style={{ width: "100%", maxWidth: 1040 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", background: "#FFFFFF", border: "1px solid var(--pw-line)", borderRadius: 16, boxShadow: "var(--pw-shadow-lg)", overflow: "hidden" }}>
            {/* Left: form */}
            <div style={{ padding: "48px 48px 44px" }}>
              {emailConfirm ? (
                <div style={{ minHeight: 428, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--pw-green-100)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0B7E4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h1 style={{ margin: "0 0 10px", fontFamily: "var(--pw-font-display)", fontWeight: 600, fontSize: 30, lineHeight: 1.08, letterSpacing: "-0.02em" }}>Confirm your account.</h1>
                  <p style={{ margin: "0 0 26px", fontSize: 14.5, lineHeight: 1.62, color: "var(--pw-fg-2)", maxWidth: "44ch" }}>
                    We&apos;ve sent a verification link to <b>{form.email}</b>. Click it to activate your account, then come back here to log in.
                  </p>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                    <button type="button" onClick={() => { setEmailConfirm(false); setIsLogin(true); }} style={{ background: "var(--pw-ink)", color: "#FFFFFF", fontSize: 14, fontWeight: 600, padding: "12px 20px", borderRadius: 8, border: 0, cursor: "pointer" }}>
                      Back to log in
                    </button>
                  </div>
                </div>
              ) : isLogin ? (
                <div>
                  <p style={{ margin: "0 0 12px", fontFamily: "var(--pw-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--pw-green-700)" }}>Welcome back</p>
                  <h1 style={{ margin: "0 0 8px", fontFamily: "var(--pw-font-display)", fontWeight: 600, fontSize: 32, lineHeight: 1.08, letterSpacing: "-0.02em" }}>Log in to ProcureWide</h1>
                  <p style={{ margin: "0 0 30px", fontSize: 14.5, lineHeight: 1.6, color: "var(--pw-fg-3)" }}>Access your lab&apos;s procurement portal.</p>

                  <form onSubmit={handleLogin} noValidate>
                    <label style={{ display: "block", marginBottom: 18 }}>
                      <span style={FIELD_LABEL}>Work email</span>
                      <input name="email" type="email" autoComplete="email" placeholder="you@yourlab.com" value={form.email} onChange={(e) => set("email", e.target.value)} style={INPUT} />
                      {errors.email && <span style={errText}>{errors.email}</span>}
                    </label>

                    <label style={{ display: "block", marginBottom: 16 }}>
                      <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--pw-ink-500)" }}>Password</span>
                        <a href="mailto:hello@procurewide.com?subject=Password%20reset" style={{ fontSize: 12, fontWeight: 600, color: "var(--pw-green-700)" }}>Forgot password?</a>
                      </span>
                      <span style={{ position: "relative", display: "block" }}>
                        <input name="password" type={showPw ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" value={form.password} onChange={(e) => set("password", e.target.value)} style={{ ...INPUT, padding: "12px 66px 12px 14px" }} />
                        <button type="button" onClick={() => setShowPw((s) => !s)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "transparent", border: 0, cursor: "pointer", fontFamily: "var(--pw-font-mono)", fontSize: 11, letterSpacing: "0.04em", fontWeight: 600, color: "var(--pw-mute)", padding: "6px 8px" }}>
                          {showPw ? "HIDE" : "SHOW"}
                        </button>
                      </span>
                      {errors.password && <span style={errText}>{errors.password}</span>}
                    </label>

                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, cursor: "pointer", userSelect: "none" }}>
                      <input name="remember" type="checkbox" defaultChecked style={{ width: 15, height: 15, accentColor: "var(--pw-green)", cursor: "pointer" }} />
                      <span style={{ fontSize: 13, color: "var(--pw-fg-2)" }}>Keep me signed in on this device</span>
                    </label>

                    <ErrorAlert />

                    <button type="submit" disabled={busy} style={{ ...GREEN_BTN, opacity: busy ? 0.85 : 1 }}>
                      {busy ? (<><Spinner />Signing in…</>) : "Log in"}
                    </button>
                  </form>

                  <p style={{ margin: "26px 0 0", paddingTop: 22, borderTop: "1px solid var(--pw-line)", fontSize: 13.5, lineHeight: 1.6, color: "var(--pw-fg-3)" }}>
                    Don&apos;t have access yet?{" "}
                    <Link href="/submit-order" style={{ color: "var(--pw-green-700)", fontWeight: 600, borderBottom: "1px solid var(--pw-green-100)", paddingBottom: 1 }}>
                      Submit an example order
                    </Link>{" "}
                    and we&apos;ll set your lab up.
                  </p>
                  <p style={{ margin: "10px 0 0", fontSize: 13.5, color: "var(--pw-fg-3)" }}>
                    Have a company signup key?{" "}
                    <button type="button" onClick={switchMode} style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: "var(--pw-font-sans)", fontSize: 13.5, fontWeight: 600, color: "var(--pw-green-700)" }}>
                      Create your account
                    </button>
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ margin: "0 0 12px", fontFamily: "var(--pw-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--pw-green-700)" }}>Get started</p>
                  <h1 style={{ margin: "0 0 8px", fontFamily: "var(--pw-font-display)", fontWeight: 600, fontSize: 32, lineHeight: 1.08, letterSpacing: "-0.02em" }}>Create your account</h1>
                  <p style={{ margin: "0 0 30px", fontSize: 14.5, lineHeight: 1.6, color: "var(--pw-fg-3)" }}>Use the signup key your company received from ProcureWide.</p>

                  <form onSubmit={handleSignup} noValidate>
                    <label style={{ display: "block", marginBottom: 16 }}>
                      <span style={FIELD_LABEL}>Full name</span>
                      <input type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => set("name", e.target.value)} style={INPUT} />
                      {errors.name && <span style={errText}>{errors.name}</span>}
                    </label>
                    <label style={{ display: "block", marginBottom: 16 }}>
                      <span style={FIELD_LABEL}>Work email</span>
                      <input type="email" autoComplete="email" placeholder="you@yourlab.com" value={form.email} onChange={(e) => set("email", e.target.value)} style={INPUT} />
                      {errors.email && <span style={errText}>{errors.email}</span>}
                    </label>
                    <label style={{ display: "block", marginBottom: 16 }}>
                      <span style={FIELD_LABEL}>Company signup key</span>
                      <input type="text" placeholder="Enter your company key" value={form.companyKey} onChange={(e) => set("companyKey", e.target.value)} style={INPUT} />
                      {errors.companyKey && <span style={errText}>{errors.companyKey}</span>}
                    </label>
                    <label style={{ display: "block", marginBottom: 16 }}>
                      <span style={FIELD_LABEL}>Password</span>
                      <span style={{ position: "relative", display: "block" }}>
                        <input type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" value={form.password} onChange={(e) => set("password", e.target.value)} style={{ ...INPUT, padding: "12px 66px 12px 14px" }} />
                        <button type="button" onClick={() => setShowPw((s) => !s)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "transparent", border: 0, cursor: "pointer", fontFamily: "var(--pw-font-mono)", fontSize: 11, fontWeight: 600, color: "var(--pw-mute)", padding: "6px 8px" }}>
                          {showPw ? "HIDE" : "SHOW"}
                        </button>
                      </span>
                      {errors.password && <span style={errText}>{errors.password}</span>}
                    </label>
                    <label style={{ display: "block", marginBottom: 22 }}>
                      <span style={FIELD_LABEL}>Confirm password</span>
                      <input type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} style={INPUT} />
                      {errors.confirmPassword && <span style={errText}>{errors.confirmPassword}</span>}
                    </label>

                    <ErrorAlert />

                    <button type="submit" disabled={busy} style={{ ...GREEN_BTN, opacity: busy ? 0.85 : 1 }}>
                      {busy ? (<><Spinner />Creating…</>) : "Create account"}
                    </button>
                  </form>

                  <p style={{ margin: "26px 0 0", paddingTop: 22, borderTop: "1px solid var(--pw-line)", fontSize: 13.5, color: "var(--pw-fg-3)" }}>
                    Already have an account?{" "}
                    <button type="button" onClick={switchMode} style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: "var(--pw-font-sans)", fontSize: 13.5, fontWeight: 600, color: "var(--pw-green-700)" }}>
                      Log in
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* Right: ink panel */}
            <div style={{ position: "relative", background: "linear-gradient(165deg,#0E1E44 0%, #0A1530 62%)", color: "#FFFFFF", padding: "48px 44px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/double-helix.png" alt="" style={{ position: "absolute", right: -46, bottom: -40, height: 300, opacity: 0.14, pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ margin: "0 0 20px", fontFamily: "var(--pw-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--pw-green-300)" }}>For enrolled labs</p>
                <h2 style={{ margin: "0 0 24px", fontFamily: "var(--pw-font-display)", fontWeight: 600, fontSize: 24, lineHeight: 1.16, letterSpacing: "-0.01em" }}>Everything your lab orders, in one portal.</h2>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                  {[
                    ["A", "Request and approve in one place, with vendor pricing side by side on every line."],
                    ["B", "Live status on every order, from purchase to consolidated drop-off at your bench."],
                    ["C", "Spend by vendor and category, documents on file, one itemized bill a month."],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 16, padding: "15px 0", borderBottom: "1px solid rgba(255,255,255,0.14)", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "var(--pw-font-mono)", fontSize: 11, color: "var(--pw-green-300)" }}>{k}</span>
                      <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.86)" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <p style={{ margin: "28px 0 0", fontFamily: "var(--pw-font-mono)", fontSize: 10.5, letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)" }}>APP.PROCUREWIDE.COM · AN AFFILIATE OF PRODIGY LABS</p>
              </div>
            </div>
          </div>

          <p style={{ margin: "22px 0 0", textAlign: "center", fontFamily: "var(--pw-font-mono)", fontSize: 10.5, letterSpacing: "0.06em", color: "var(--pw-mute)" }}>
            SECURE LOGIN · PORTAL ACCESS IS PROVISIONED PER YOUR LAB SUPPORT AGREEMENT
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--pw-line-2)", background: "var(--pw-paper)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 15, color: "var(--pw-ink)", marginBottom: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pw/logo.png" width={24} height={24} alt="" style={{ display: "block" }} />
                <span>ProcureWide</span>
              </Link>
              <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6, color: "var(--pw-fg-3)", maxWidth: "36ch" }}>
                San Diego&apos;s lab supply, equipment, and software partner. Sourced across our vendor network, consolidated at our facility, delivered on our own routes.
              </p>
              <p style={{ margin: "0 0 6px", fontFamily: "var(--pw-font-display)", fontWeight: 600, fontSize: 16, color: "var(--pw-ink)" }}>Stock the bench. Scale the science.</p>
              <p style={{ margin: 0, fontFamily: "var(--pw-font-mono)", fontSize: 11, letterSpacing: "0.05em", color: "var(--pw-green-700)" }}>Biotech partners since 2018</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <h5 style={{ margin: "0 0 5px", fontFamily: "var(--pw-font-mono)", fontSize: 10.5, fontWeight: 500, letterSpacing: "0.07em", color: "var(--pw-mute)" }}>EXPLORE</h5>
              {NAV.slice(0, 3).map((n) => (
                <Link key={n.href} href={n.href} style={{ fontSize: 13.5, color: "var(--pw-fg-2)" }}>{n.label}</Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <h5 style={{ margin: "0 0 5px", fontFamily: "var(--pw-font-mono)", fontSize: 10.5, fontWeight: 500, letterSpacing: "0.07em", color: "var(--pw-mute)" }}>COMPANY</h5>
              <Link href="/prodigy-labs" style={{ fontSize: 13.5, color: "var(--pw-fg-2)" }}>Prodigy Labs</Link>
              <a href="mailto:hello@procurewide.com?subject=Contact" style={{ fontSize: 13.5, color: "var(--pw-fg-2)" }}>Contact</a>
              <Link href="/auth" style={{ fontSize: 13.5, color: "var(--pw-fg-2)" }}>Log in</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <h5 style={{ margin: "0 0 5px", fontFamily: "var(--pw-font-mono)", fontSize: 10.5, fontWeight: 500, letterSpacing: "0.07em", color: "var(--pw-mute)" }}>GET IN TOUCH</h5>
              <a href="mailto:hello@procurewide.com" style={{ fontSize: 13.5, color: "var(--pw-fg-2)" }}>hello@procurewide.com</a>
              <Link href="/submit-order" style={{ fontSize: 13.5, color: "var(--pw-fg-2)" }}>Submit an example order</Link>
              <span style={{ fontSize: 13.5, color: "var(--pw-fg-3)" }}>San Diego, California</span>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--pw-line)", paddingTop: 16, display: "flex", justifyContent: "space-between", gap: 16, fontFamily: "var(--pw-font-mono)", fontSize: 10.5, letterSpacing: "0.05em", color: "var(--pw-mute)", flexWrap: "wrap" }}>
            <span>© 2026 PROCUREWIDE · SAN DIEGO, CA</span>
            <span>LAB SUPPLIES · EQUIPMENT · SOFTWARE · SCHEDULED DELIVERY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
