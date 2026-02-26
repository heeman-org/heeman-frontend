import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/Button";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data: _data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                // Handle unverified user error
                if (error.message?.toLowerCase().includes("verify") || error.status === 403) {
                    setError("Email not verified. Redirecting to verification...");
                    localStorage.setItem("heman_pending_verification", email);

                    // Trigger a fresh OTP for them
                    await authClient.emailOtp.sendVerificationOtp({
                        email,
                        type: "sign-in",
                    });

                    setTimeout(() => navigate("/signup"), 1500);
                } else {
                    setError(error.message || "Invalid credentials");
                }
            } else {
                navigate("/");
            }
        } catch (err: any) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 pt-32 font-serif text-primary">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-display font-bold tracking-tight mb-3">Welcome Back</h1>
                    <p className="text-primary/60 text-sm italic">Enter your credentials to access your profile</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className={`p-3 text-xs font-semibold uppercase tracking-wider text-center border italic ${error.includes("Redirecting")
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-red-50 text-red-500 border-red-100"
                            }`}>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                                className="w-full h-14 bg-zinc-50 border-transparent focus:border-accent outline-none px-12 text-sm transition-all duration-300 rounded-none italic"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full h-14 bg-zinc-50 border-transparent focus:border-accent outline-none px-12 text-sm transition-all duration-300 rounded-none italic"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={loading}
                        className="w-full h-14 rounded-none font-bold tracking-[0.2em] uppercase text-xs group transition-all"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin mr-2" size={18} />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center border-t border-zinc-100 pt-8">
                    <p className="text-sm text-primary/50">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-accent font-bold hover:underline transition-all underline-offset-4">
                            Establish Profile
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
