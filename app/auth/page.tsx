"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
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
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({
      email: formData.email,
      password: formData.password,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
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
      toast({
        title: "Invalid",
        description: "Invalid email or password.",
      });
      console.log(res.error);
      setLoading(false);
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome Back!",
      });
      router.replace("/dashboard");
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
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
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
      toast({
        title: "SignupKey Invalid!",
        description: res.error,
      });
      setLoading(false);
    } else {
      setEmailConfirm(true);
      toast({
        title: "Success!",
        description: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-40 pb-16">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-elegant">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin
                    ? "Welcome Back"
                    : emailConfirm
                      ? "Confirm your account"
                      : "Create Account"}
                </h1>
                <p className="text-muted-foreground">
                  {isLogin
                    ? "Sign in to access your account"
                    : emailConfirm
                      ? "Please check you email to verify your account!"
                      : "Get started with Mission Booster"}
                </p>
              </div>
              {!emailConfirm && (
                <>
                  <form
                    onSubmit={isLogin ? handleLogin : handleSignup}
                    className="space-y-5"
                  >
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className={`pl-10 ${
                              errors.name ? "border-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`pl-10 ${
                            errors.email ? "border-destructive" : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="companyKey">Company Signup Key</Label>
                        <Input
                          id="companyKey"
                          name="companyKey"
                          type="text"
                          placeholder="Enter your company key"
                          value={formData.companyKey}
                          onChange={handleChange}
                          className={
                            errors.companyKey ? "border-destructive" : ""
                          }
                        />
                        {errors.companyKey && (
                          <p className="text-sm text-destructive">
                            {errors.companyKey}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className={`pl-10 pr-10 ${
                            errors.password ? "border-destructive" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`pl-10 ${
                              errors.confirmPassword ? "border-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="accent"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading
                        ? "Please wait..."
                        : isLogin
                          ? "Sign In"
                          : "Create Account"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-muted-foreground">
                      {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setErrors({});
                          setFormData({
                            name: "",
                            email: "",
                            companyKey: "", // add this
                            password: "",
                            confirmPassword: "",
                          });
                        }}
                        className="text-accent hover:underline font-medium"
                      >
                        {isLogin ? "Sign up" : "Sign in"}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
