import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Lock, Mail, Eye, EyeOff, Shield, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import loginIllustration from "@/assets/login-illustration.jpg";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate("/dashboard");
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password. Try admin@medcode.ai / admin123",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <ParticleBackground />

      {/* Left — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative gradient-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative z-10 flex flex-col items-center justify-center px-12 text-center">
          <img
            src={loginIllustration}
            alt="AI Medical Coding"
            className="w-full max-w-md rounded-2xl shadow-2xl shadow-glow mb-10 animate-float"
          />
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">
            AI-Powered Automated
            <br />
            <span className="text-gradient">Medical Coding Platform</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-sm text-sm leading-relaxed">
            Transform clinical documents into standardized ICD-10, CPT & HCPCS codes
            with advanced NLP and AI-driven confidence scoring.
          </p>

          <div className="flex gap-4 mt-8">
            {["ICD-10", "CPT", "HCPCS"].map((code) => (
              <div
                key={code}
                className="px-4 py-2 rounded-full glass text-xs font-semibold text-primary-foreground/80"
              >
                {code}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background relative z-10">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedCode AI</h1>
              <p className="text-xs text-muted-foreground">Automated Medical Coding System</p>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Welcome back</h3>
              <p className="text-sm text-muted-foreground mt-1">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-card-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@medcode.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-shadow"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-card-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-shadow"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(!!v)}
                  />
                  <Label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">Remember me</Label>
                </div>
                <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-lg transition-all duration-300"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Badges */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-success" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" />
                256-bit Encryption
              </div>
            </div>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-[11px] text-muted-foreground text-center">
              <span className="font-semibold">Demo:</span> admin@medcode.ai / admin123 &nbsp;•&nbsp; user@medcode.ai / user123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
