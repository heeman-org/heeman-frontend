import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/Button";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await authClient.signUp.email({
                email,
                password,
                name,
            });

            if (error) {
                setError(error.message || "Failed to create account");
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
        <div className="min-h-screen bg-white flex items-center justify-center p-6 pt-32 text-primary">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-display font-bold tracking-tight mb-3">
                        Join Heeman
                    </h1>
                    <p className="text-primary/60 text-sm">
                        Establish your profile to start your journey
                    </p>
                </div>

                <form
                    onSubmit={handleSignup}
                    className="space-y-6"
                >
                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-xs font-semibold uppercase tracking-wider text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="w-full h-14 bg-zinc-50 border-transparent focus:border-accent outline-none px-12 text-sm transition-all duration-300 rounded-none"
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                                className="w-full h-14 bg-zinc-50 border-transparent focus:border-accent outline-none px-12 text-sm transition-all duration-300 rounded-none"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create Password"
                                required
                                className="w-full h-14 bg-zinc-50 border-transparent focus:border-accent outline-none px-12 text-sm transition-all duration-300 rounded-none"
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
                                Establish Profile
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center border-t border-zinc-100 pt-8">
                    <p className="text-sm text-primary/60">
                        Already have an account?{" "}
                        <Link to="/login" className="text-accent font-bold hover:underline transition-all underline-offset-4">
                            Proceed to Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
