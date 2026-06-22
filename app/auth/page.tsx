"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { signUpAction, loginAction } from "./actions";
import { useRouter } from "next/navigation";

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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const errStyle: React.CSSProperties = { color: "var(--danger)", fontSize: 12.5, fontWeight: 500 };

const Auth = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyKey: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = loginSchema.safeParse({ email: formData.email, password: formData.password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.set("email", formData.email);
    fd.set("password", formData.password);
    const res = await loginAction(fd);
    if (res.error) {
      toast({ title: "Invalid", description: "Invalid email or password." });
      setLoading(false);
    } else {
      toast({ title: "Login Successful", description: "Welcome Back!" });
      router.replace("/app");
      router.refresh();
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.set("name", formData.name);
    fd.set("email", formData.email);
    fd.set("password", formData.password);
    fd.set("companyKey", formData.companyKey);
    const res = await signUpAction(fd);
    if (res.error) {
      toast({ title: "Signup Key Invalid!", description: res.error });
      setLoading(false);
    } else {
      setEmailConfirm(true);
      toast({ title: "Success!", description: "" });
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: "", email: "", companyKey: "", password: "", confirmPassword: "" });
  };

  const EyeIcon = showPassword ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-3.3 4.2M6.6 6.6A18 18 0 0 0 2 11s3.5 7 10 7a10.9 10.9 0 0 0 4-.7" />
      <path d="m2 2 20 20" />
      <path d="M9.5 9.5a3 3 0 0 0 4.2 4.2" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div className="pw-site">
      <div className="auth">
        {/* Brand panel — the marketing "site" half */}
        <aside className="auth-brand">
          <div className="auth-brand-top">
            <a className="brand" href="/" aria-label="ProcureWide home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pw/logo.png" width={30} height={30} alt="" />
              <span>ProcureWide</span>
            </a>
            <a className="auth-back" href="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M11 18l-6-6 6-6" />
              </svg>
              Back to site
            </a>
          </div>

          <div className="auth-brand-mid">
            <span className="eyebrow">Your procurement, in one place</span>
            <h2 className="auth-headline">
              Everything you order, <span className="accent">on one screen.</span>
            </h2>
            <p className="auth-sub">
              Sign in to request items, approve orders, track every shipment to your door, and see exactly what
              you&apos;re spending and saving.
            </p>
            <div className="auth-points">
              {[
                "Real vendor prices on every line — no markups",
                "Live status on everything in transit",
                "One itemized bill each month",
              ].map((t) => (
                <div className="auth-point" key={t}>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>{" "}
                  {t}
                </div>
              ))}
            </div>
            <div className="auth-shot">
              <div className="auth-shot-bar">
                <i />
                <i />
                <i />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pw/product-dashboard.png"
                width={914}
                height={530}
                alt="ProcureWide dashboard showing spend, savings, and reorders"
                loading="lazy"
              />
            </div>
          </div>

          <div className="auth-brand-foot">
            <span className="tag">Made by Scientists, for Science</span>
            <span>100+ vendors · One relationship</span>
          </div>
        </aside>

        {/* Form panel — the functional "portal" half */}
        <main className="auth-pane">
          <div className="auth-card">
            {emailConfirm ? (
              <>
                <span className="eyebrow">Almost there</span>
                <h1>Confirm your account</h1>
                <p className="sub">
                  We&apos;ve sent a verification link to <b>{formData.email || "your email"}</b>. Click it to activate
                  your account, then come back here to sign in.
                </p>
                <div className="auth-actions" style={{ marginTop: 28 }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                    onClick={() => {
                      setEmailConfirm(false);
                      setIsLogin(true);
                    }}
                  >
                    Back to sign in
                  </button>
                </div>
              </>
            ) : isLogin ? (
              <>
                <span className="eyebrow">Welcome back</span>
                <h1>Sign in</h1>
                <p className="sub">Access your ProcureWide account.</p>

                <form className="auth-form" onSubmit={handleLogin} noValidate>
                  <div className="field">
                    <label htmlFor="email">Work email</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                      <input type="email" id="email" name="email" placeholder="you@yourlab.com" autoComplete="email" value={formData.email} onChange={handleChange} />
                    </div>
                    {errors.email && <span style={errStyle}>{errors.email}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" autoComplete="current-password" value={formData.password} onChange={handleChange} />
                      <button type="button" className="toggle" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
                        {EyeIcon}
                      </button>
                    </div>
                    {errors.password && <span style={errStyle}>{errors.password}</span>}
                  </div>

                  <div className="field-row">
                    <label className="remember">
                      <input type="checkbox" name="remember" /> Keep me signed in
                    </label>
                    <a className="link-accent" href="mailto:hello@procurewide.com?subject=Password%20reset">
                      Forgot password?
                    </a>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
                    {loading ? "Signing in…" : "Sign in"}
                    {!loading && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </button>
                </form>

                <div className="auth-or">No account yet?</div>
                <a className="btn btn-secondary btn-lg btn-block" href="/submit-order">
                  Get pricing — submit an example order
                </a>
                <p className="auth-switch">
                  Have a company invite key?{" "}
                  <a role="button" tabIndex={0} onClick={switchMode} onKeyDown={(e) => e.key === "Enter" && switchMode()} style={{ cursor: "pointer" }}>
                    Create your account
                  </a>
                </p>
              </>
            ) : (
              <>
                <span className="eyebrow">Get started</span>
                <h1>Create your account</h1>
                <p className="sub">Use the signup key your company received from ProcureWide.</p>

                <form className="auth-form" onSubmit={handleSignup} noValidate>
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input type="text" id="name" name="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} />
                    </div>
                    {errors.name && <span style={errStyle}>{errors.name}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="email">Work email</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                      <input type="email" id="email" name="email" placeholder="you@yourlab.com" autoComplete="email" value={formData.email} onChange={handleChange} />
                    </div>
                    {errors.email && <span style={errStyle}>{errors.email}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="companyKey">Company signup key</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.7 11.3a4 4 0 1 0-5.4 5.4l-3.3 3.3 2 2 1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4 1.5-1.5-4-4" />
                        <circle cx="16" cy="8" r="2" />
                      </svg>
                      <input type="text" id="companyKey" name="companyKey" placeholder="Enter your company key" value={formData.companyKey} onChange={handleChange} />
                    </div>
                    {errors.companyKey && <span style={errStyle}>{errors.companyKey}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Create a password" autoComplete="new-password" value={formData.password} onChange={handleChange} />
                      <button type="button" className="toggle" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
                        {EyeIcon}
                      </button>
                    </div>
                    {errors.password && <span style={errStyle}>{errors.password}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <div className="input">
                      <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      <input type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                    {errors.confirmPassword && <span style={errStyle}>{errors.confirmPassword}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
                    {loading ? "Creating…" : "Create account"}
                  </button>
                </form>

                <p className="auth-switch">
                  Already have an account?{" "}
                  <a role="button" tabIndex={0} onClick={switchMode} onKeyDown={(e) => e.key === "Enter" && switchMode()} style={{ cursor: "pointer" }}>
                    Sign in
                  </a>
                </p>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
