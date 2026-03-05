import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/Button";
import { User, Mail, Lock, ArrowRight, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";

type SignupStep = "details" | "otp";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<SignupStep>("details");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Check for pending verification on mount
    useEffect(() => {
        const pendingEmail = localStorage.getItem("Heeman_pending_verification");
        if (pendingEmail) {
            setEmail(pendingEmail);
            setStep("otp");
        }
    }, []);

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
                // If user already exists, they might be unverified
                if (error.status === 400 || error.message?.toLowerCase().includes("exists")) {
                    // Try sending a fresh OTP to see if we can move them to verification
                    const { error: otpError } = await authClient.emailOtp.sendVerificationOtp({
                        email,
                        type: "sign-in", // sign-in type also works for verification in Better Auth's flow
                    });

                    if (otpError) {
                        setError(error.message || "User already registered. Please login.");
                    } else {
                        localStorage.setItem("Heeman_pending_verification", email);
                        setStep("otp");
                    }
                } else {
                    setError(error.message || "Failed to create account");
                }
            } else {
                localStorage.setItem("Heeman_pending_verification", email);
                setStep("otp");
            }
        } catch (err: any) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await authClient.emailOtp.verifyEmail({
                email,
                otp,
            });

            if (error) {
                setError(error.message || "Invalid or expired OTP.");
            } else {
                // Success - clear pending state and proceed
                localStorage.removeItem("Heeman_pending_verification");
                navigate("/");
            }
        } catch (err: any) {
            setError("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToDetails = () => {
        localStorage.removeItem("Heeman_pending_verification");
        setStep("details");
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
                        {step === "details" ? "Join Heeman" : "Verify Identity"}
                    </h1>
                    <p className="text-primary/60 text-sm">
                        {step === "details"
                            ? "Establish your profile to start your journey"
                            : `A verification code has been dispatched to ${email}`}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === "details" ? (
                        <motion.form
                            key="details-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
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
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleVerifyOTP}
                            className="space-y-6"
                        >
                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-xs font-semibold uppercase tracking-wider text-center border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div className="relative group">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Verification Code"
                                    required
                                    maxLength={6}
                                    className="w-full h-14 bg-zinc-50 border-transparent focus:border-accent outline-none px-12 text-sm transition-all duration-300 rounded-none tracking-[0.5em] font-bold text-center"
                                />
                            </div>

                            <Button
                                disabled={loading}
                                className="w-full h-14 rounded-none font-bold tracking-[0.2em] uppercase text-xs group transition-all"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                ) : (
                                    <>
                                        Complete Verification
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                                    </>
                                )}
                            </Button>

                            <button
                                type="button"
                                onClick={handleBackToDetails}
                                className="w-full text-center text-xs font-semibold uppercase tracking-widest text-primary/50 hover:text-accent transition-colors flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={14} />
                                Modify Profile Details
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

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
