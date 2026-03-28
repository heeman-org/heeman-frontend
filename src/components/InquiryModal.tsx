import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Mail, Phone, ArrowRight, Loader2,
    CheckCircle2, RefreshCw, ShieldCheck
} from "lucide-react";
import { Button } from "./ui/Button";
import { ENV } from "../config/env.config";

type Step = "email" | "phone" | "success";

interface Props {
    userEmail: string;
    userName: string;
    onClose: () => void;
}

const OTP_LENGTH = 6;

export function InquiryModal({ userEmail, userName, onClose }: Props) {
    const [step, setStep] = useState<Step>("email");

    // Email step
    const [emailSent, setEmailSent] = useState(false);
    const [emailOtp, setEmailOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [emailResendCountdown, setEmailResendCountdown] = useState(0);

    // Phone step
    const [phone, setPhone] = useState("");
    const [phoneSent, setPhoneSent] = useState(false);
    const [phoneOtp, setPhoneOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [phoneResendCountdown, setPhoneResendCountdown] = useState(0);

    const emailOtpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const phoneOtpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer helper
    const startCountdown = (setter: (v: number) => void, seconds = 30) => {
        setter(seconds);
        const id = setInterval(() => {
            setter(prev => {
                if (prev <= 1) { clearInterval(id); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    // ── OTP input helpers ─────────────────────────────────────────────────

    const handleOtpInput = (
        index: number,
        value: string,
        otpArr: string[],
        setter: (v: string[]) => void,
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>
    ) => {
        // Allow paste of full OTP
        if (value.length > 1) {
            const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
            const next = [...otpArr];
            digits.forEach((d, i) => { next[i] = d; });
            setter(next);
            refs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
            return;
        }
        const digit = value.replace(/\D/g, "").slice(-1);
        const next = [...otpArr];
        next[index] = digit;
        setter(next);
        if (digit && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (
        e: React.KeyboardEvent,
        index: number,
        otpArr: string[],
        setter: (v: string[]) => void,
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>
    ) => {
        if (e.key === "Backspace" && !otpArr[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    };

    // ── Email step handlers ───────────────────────────────────────────────

    const handleSendEmailOtp = async () => {
        setEmailLoading(true);
        setEmailError("");
        try {
            const res = await fetch(`${ENV.API_BASE_URL}/api/verify/email/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            setEmailSent(true);
            startCountdown(setEmailResendCountdown);
            setTimeout(() => emailOtpRefs.current[0]?.focus(), 100);
        } catch (err: any) {
            setEmailError(err.message || "Failed to send code.");
        } finally {
            setEmailLoading(false);
        }
    };

    const handleVerifyEmail = async () => {
        const otp = emailOtp.join("");
        if (otp.length < OTP_LENGTH) { setEmailError("Please enter all 6 digits."); return; }
        setEmailLoading(true);
        setEmailError("");
        try {
            const res = await fetch(`${ENV.API_BASE_URL}/api/verify/email/confirm`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, otp }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            setStep("phone");
        } catch (err: any) {
            setEmailError(err.message || "Verification failed.");
            setEmailOtp(Array(OTP_LENGTH).fill(""));
            emailOtpRefs.current[0]?.focus();
        } finally {
            setEmailLoading(false);
        }
    };

    // ── Phone step handlers ───────────────────────────────────────────────

    const handleSendPhoneOtp = async () => {
        if (!phone.trim()) { setPhoneError("Please enter your mobile number."); return; }
        setPhoneLoading(true);
        setPhoneError("");
        // Always send with India country code prefix for MSG91
        const fullPhone = `91${phone.replace(/\D/g, "")}`;
        try {
            const res = await fetch(`${ENV.API_BASE_URL}/api/verify/phone/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: fullPhone }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            setPhoneSent(true);
            startCountdown(setPhoneResendCountdown);
            setTimeout(() => phoneOtpRefs.current[0]?.focus(), 100);
        } catch (err: any) {
            setPhoneError(err.message || "Failed to send OTP.");
        } finally {
            setPhoneLoading(false);
        }
    };

    const handleResendPhoneOtp = async () => {
        setPhoneLoading(true);
        setPhoneError("");
        const fullPhone = `91${phone.replace(/\D/g, "")}`;
        try {
            const res = await fetch(`${ENV.API_BASE_URL}/api/verify/phone/resend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: fullPhone }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            setPhoneOtp(Array(OTP_LENGTH).fill(""));
            startCountdown(setPhoneResendCountdown);
        } catch (err: any) {
            setPhoneError(err.message || "Failed to resend OTP.");
        } finally {
            setPhoneLoading(false);
        }
    };

    const handleVerifyPhone = async () => {
        const otp = phoneOtp.join("");
        if (otp.length < OTP_LENGTH) { setPhoneError("Please enter all 6 digits."); return; }
        setPhoneLoading(true);
        setPhoneError("");
        const fullPhone = `91${phone.replace(/\D/g, "")}`;
        try {
            const res = await fetch(`${ENV.API_BASE_URL}/api/verify/phone/confirm`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: fullPhone, otp }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            setStep("success");
        } catch (err: any) {
            setPhoneError(err.message || "Verification failed.");
            setPhoneOtp(Array(OTP_LENGTH).fill(""));
            phoneOtpRefs.current[0]?.focus();
        } finally {
            setPhoneLoading(false);
        }
    };

    // ── Render helpers ────────────────────────────────────────────────────

    const OtpBoxes = ({
        value,
        onChange,
        onKeyDown,
        refs,
        disabled,
    }: {
        value: string[];
        onChange: (i: number, v: string) => void;
        onKeyDown: (e: React.KeyboardEvent, i: number) => void;
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>;
        disabled?: boolean;
    }) => (
        <div className="flex gap-2 justify-center">
            {value.map((digit, i) => (
                <input
                    key={i}
                    ref={el => { refs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={e => onChange(i, e.target.value)}
                    onKeyDown={e => onKeyDown(e, i)}
                    disabled={disabled}
                    className="w-11 h-14 text-center text-xl font-bold border border-foreground/15 bg-transparent focus:border-accent focus:outline-none transition-colors disabled:opacity-40"
                />
            ))}
        </div>
    );

    const stepVariants = {
        enter: { opacity: 0, y: 24 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-background w-full max-w-md relative overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Top accent bar */}
                    <div className="h-1 w-full bg-accent" />

                    {/* Progress dots */}
                    <div className="flex gap-2 justify-center pt-8 pb-2">
                        {(["email", "phone", "success"] as Step[]).map((s, i) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? "w-8 bg-accent" : i < ["email", "phone", "success"].indexOf(step) ? "w-4 bg-accent/40" : "w-4 bg-foreground/10"}`}
                            />
                        ))}
                    </div>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:bg-foreground/5 transition-colors"
                    >
                        <X size={16} />
                    </button>

                    <div className="px-10 pb-10 pt-6">
                        <AnimatePresence mode="wait">

                            {/* ── STEP 1: EMAIL ───────────────────────────── */}
                            {step === "email" && (
                                <motion.div
                                    key="email"
                                    variants={stepVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.22 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col items-center text-center gap-3">
                                        <div className="w-14 h-14 bg-accent/10 flex items-center justify-center">
                                            <Mail size={24} className="text-accent" />
                                        </div>
                                        <h2 className="text-2xl font-display">Verify Your Email</h2>
                                        <p className="text-sm text-foreground/60 leading-relaxed">
                                            Hello <strong>{userName}</strong>, we'll send a 6-digit code to<br />
                                            <span className="font-medium text-foreground">{userEmail}</span>
                                        </p>
                                    </div>

                                    {!emailSent ? (
                                        <Button
                                            size="lg"
                                            className="w-full h-14 rounded-none bg-primary text-white hover:bg-accent transition-all group"
                                            onClick={handleSendEmailOtp}
                                            disabled={emailLoading}
                                        >
                                            {emailLoading
                                                ? <><Loader2 size={16} className="animate-spin mr-2" /> Sending...</>
                                                : <>Send Verification Code <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                                            }
                                        </Button>
                                    ) : (
                                        <div className="space-y-5">
                                            <p className="text-center text-xs text-foreground/50 uppercase tracking-widest">
                                                Code sent — check your inbox
                                            </p>

                                            <OtpBoxes
                                                value={emailOtp}
                                                onChange={(i, v) => handleOtpInput(i, v, emailOtp, setEmailOtp, emailOtpRefs)}
                                                onKeyDown={(e, i) => handleOtpKeyDown(e, i, emailOtp, setEmailOtp, emailOtpRefs)}
                                                refs={emailOtpRefs}
                                                disabled={emailLoading}
                                            />

                                            {emailError && (
                                                <p className="text-center text-red-500 text-xs font-medium">{emailError}</p>
                                            )}

                                            <Button
                                                size="lg"
                                                className="w-full h-14 rounded-none bg-primary text-white hover:bg-accent transition-all group"
                                                onClick={handleVerifyEmail}
                                                disabled={emailLoading || emailOtp.join("").length < OTP_LENGTH}
                                            >
                                                {emailLoading
                                                    ? <><Loader2 size={16} className="animate-spin mr-2" /> Verifying...</>
                                                    : <>Verify Email <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                                                }
                                            </Button>

                                            <div className="text-center">
                                                {emailResendCountdown > 0 ? (
                                                    <p className="text-xs text-foreground/40">Resend in {emailResendCountdown}s</p>
                                                ) : (
                                                    <button
                                                        onClick={handleSendEmailOtp}
                                                        disabled={emailLoading}
                                                        className="text-xs font-medium text-accent hover:underline disabled:opacity-40 flex items-center gap-1 mx-auto"
                                                    >
                                                        <RefreshCw size={12} /> Resend code
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {!emailSent && emailError && (
                                        <p className="text-center text-red-500 text-xs font-medium">{emailError}</p>
                                    )}
                                </motion.div>
                            )}

                            {/* ── STEP 2: PHONE ───────────────────────────── */}
                            {step === "phone" && (
                                <motion.div
                                    key="phone"
                                    variants={stepVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.22 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col items-center text-center gap-3">
                                        <div className="w-14 h-14 bg-green-500/10 flex items-center justify-center">
                                            <CheckCircle2 size={22} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-2">Email Verified</p>
                                            <h2 className="text-2xl font-display">Verify Your Mobile</h2>
                                        </div>
                                        <p className="text-sm text-foreground/60 leading-relaxed">
                                            Enter your mobile number to receive<br />an SMS verification code.
                                        </p>
                                    </div>

                                    {!phoneSent ? (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">
                                                    Mobile Number
                                                </label>
                                                <div className="flex border border-foreground/10 focus-within:border-accent transition-colors">
                                                    <span className="flex items-center px-3 text-sm text-foreground/40 border-r border-foreground/10 select-none">
                                                        +91
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        placeholder="98765 43210"
                                                        value={phone}
                                                        onChange={e => {
                                                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                                            setPhone(val);
                                                        }}
                                                        onKeyDown={e => { if (e.key === "Enter") handleSendPhoneOtp(); }}
                                                        className="flex-1 bg-transparent px-3 py-3 outline-none text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {phoneError && (
                                                <p className="text-red-500 text-xs font-medium">{phoneError}</p>
                                            )}

                                            <Button
                                                size="lg"
                                                className="w-full h-14 rounded-none bg-primary text-white hover:bg-accent transition-all group"
                                                onClick={handleSendPhoneOtp}
                                                disabled={phoneLoading}
                                            >
                                                {phoneLoading
                                                    ? <><Loader2 size={16} className="animate-spin mr-2" /> Sending OTP...</>
                                                    : <>Send OTP <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                                                }
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            <p className="text-center text-xs text-foreground/50 uppercase tracking-widest">
                                                OTP sent to +91 {phone}
                                                <button
                                                    onClick={() => { setPhoneSent(false); setPhoneOtp(Array(OTP_LENGTH).fill("")); setPhoneError(""); }}
                                                    className="ml-2 text-accent underline"
                                                >
                                                    Change
                                                </button>
                                            </p>

                                            <OtpBoxes
                                                value={phoneOtp}
                                                onChange={(i, v) => handleOtpInput(i, v, phoneOtp, setPhoneOtp, phoneOtpRefs)}
                                                onKeyDown={(e, i) => handleOtpKeyDown(e, i, phoneOtp, setPhoneOtp, phoneOtpRefs)}
                                                refs={phoneOtpRefs}
                                                disabled={phoneLoading}
                                            />

                                            {phoneError && (
                                                <p className="text-center text-red-500 text-xs font-medium">{phoneError}</p>
                                            )}

                                            <Button
                                                size="lg"
                                                className="w-full h-14 rounded-none bg-primary text-white hover:bg-accent transition-all group"
                                                onClick={handleVerifyPhone}
                                                disabled={phoneLoading || phoneOtp.join("").length < OTP_LENGTH}
                                            >
                                                {phoneLoading
                                                    ? <><Loader2 size={16} className="animate-spin mr-2" /> Verifying...</>
                                                    : <>Verify Mobile <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                                                }
                                            </Button>

                                            <div className="text-center">
                                                {phoneResendCountdown > 0 ? (
                                                    <p className="text-xs text-foreground/40">Resend in {phoneResendCountdown}s</p>
                                                ) : (
                                                    <button
                                                        onClick={handleResendPhoneOtp}
                                                        disabled={phoneLoading}
                                                        className="text-xs font-medium text-accent hover:underline disabled:opacity-40 flex items-center gap-1 mx-auto"
                                                    >
                                                        <RefreshCw size={12} /> Resend OTP
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* ── STEP 3: SUCCESS ─────────────────────────── */}
                            {step === "success" && (
                                <motion.div
                                    key="success"
                                    variants={stepVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.22 }}
                                    className="space-y-6 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                                        className="w-20 h-20 bg-accent/10 flex items-center justify-center mx-auto"
                                    >
                                        <ShieldCheck size={36} className="text-accent" />
                                    </motion.div>

                                    <div>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl font-display mb-3"
                                        >
                                            You're Verified!
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-sm text-foreground/60 leading-relaxed"
                                        >
                                            Both your email and mobile number have been verified.
                                            Our team will reach out to you at
                                        </motion.p>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="bg-secondary/40 border border-foreground/5 p-5 space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={14} className="text-green-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground/40">Email</p>
                                                <p className="text-sm font-medium">{userEmail}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={14} className="text-green-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground/40">Mobile</p>
                                                <p className="text-sm font-medium">+91 {phone}</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.45 }}
                                        className="text-xs text-foreground/40 leading-relaxed"
                                    >
                                        We'll contact you soon to process your enquiry.<br />
                                        Expect a call or message within 24–48 hours.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Button
                                            size="lg"
                                            className="w-full h-14 rounded-none bg-primary text-white hover:bg-accent transition-all"
                                            onClick={onClose}
                                        >
                                            Done
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
