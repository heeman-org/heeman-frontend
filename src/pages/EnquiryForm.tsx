import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Button } from "../components/ui/Button";

interface LocationState {
    verified: boolean;
    phone: string;
    name: string;
    email: string;
}

export default function EnquiryForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | null;

    const [formData, setFormData] = useState({
        name: state?.name || "",
        email: state?.email || "",
        phone: state?.phone ? `+91${state.phone}` : "",
        message: "",
    });
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Guard: must arrive here via verification
    useEffect(() => {
        if (!state?.verified) {
            navigate("/contact", { replace: true });
        }
    }, []);

    if (!state?.verified) return null;

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(prev => [...prev, ...files].slice(0, 5));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setError("Please fill out all required fields.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const form = new FormData();
            form.append("name", formData.name);
            form.append("email", formData.email);
            form.append("phone", formData.phone);
            form.append("message", formData.message);
            images.forEach(img => form.append("images", img));

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiry`, {
                method: "POST",
                body: form,
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
            } else {
                throw new Error(data.error || "Failed to submit enquiry.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to submit. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md px-6 space-y-6"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-20 h-20 bg-accent/10 flex items-center justify-center mx-auto"
                    >
                        <LucideIcons.CheckCircle2 size={36} className="text-accent" />
                    </motion.div>
                    <h2 className="text-3xl font-display">Enquiry Submitted!</h2>
                    <p className="text-foreground/60 leading-relaxed">
                        Thank you for your custom order enquiry. Our team will review your request and reach out within 24–48 hours.
                    </p>
                    <Button
                        size="lg"
                        onClick={() => navigate("/")}
                        className="h-14 px-10 rounded-none bg-primary text-white hover:bg-accent transition-all"
                    >
                        Back to Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24">
            <section className="container mx-auto px-6">
                <div className="max-w-2xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
                    >
                        Custom Orders
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display mb-6"
                    >
                        Custom Order<br /><span className="font-medium">Enquiry</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground/60 leading-relaxed"
                    >
                        Describe your custom product request. Upload reference images to help us understand exactly what you envision.
                    </motion.p>

                    {/* Verified badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 text-sm text-green-700 dark:text-green-400 font-medium"
                    >
                        <LucideIcons.ShieldCheck size={16} />
                        Identity verified — {formData.email} &amp; +91{state.phone}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-secondary/30 p-12 lg:p-16 border border-foreground/5 max-w-4xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="bg-red-500/10 text-red-700 dark:text-red-400 p-4 font-medium text-sm border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Full Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    readOnly
                                    className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none opacity-70 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Email Address *</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none opacity-70 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Verified Mobile Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                readOnly
                                className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none opacity-70 cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Describe Your Product *</label>
                            <textarea
                                required
                                rows={6}
                                placeholder="Describe the product you want — style, colour, material, size, quantity, occasion, or anything else that helps us understand your vision..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                disabled={loading}
                                className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-widest font-semibold opacity-50">
                                Reference Images (up to 5)
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageSelect}
                                disabled={loading || images.length >= 5}
                            />

                            {images.length < 5 && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={loading}
                                    className="w-full border-2 border-dashed border-foreground/10 hover:border-accent/40 transition-colors py-10 flex flex-col items-center gap-3 text-foreground/40 hover:text-accent group"
                                >
                                    <LucideIcons.Upload size={28} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Click to upload images</span>
                                    <span className="text-xs">JPG, PNG, WEBP up to 10MB each</span>
                                </button>
                            )}

                            {images.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-square group">
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt={`Reference ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <LucideIcons.X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square border-2 border-dashed border-foreground/10 hover:border-accent/40 flex items-center justify-center text-foreground/30 hover:text-accent transition-colors"
                                        >
                                            <LucideIcons.Plus size={20} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                            className="w-full h-16 rounded-none bg-primary text-white hover:bg-accent transition-all group disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit Enquiry"}
                            {!loading && <LucideIcons.ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />}
                        </Button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
}
