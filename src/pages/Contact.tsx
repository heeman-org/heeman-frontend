import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Button } from "../components/ui/Button";
import { contactConstants } from "../constants";
import { authClient } from "../lib/auth-client";

export default function Contact() {
    const { data: session, isPending } = authClient.useSession();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: contactConstants.form.fields.subject.options[0],
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Populate user data once session is loaded
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || "",
                email: session.user.email || ""
            }));
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If user is not authenticated, redirect to login page with a message
        if (!session?.user) {
            setError("Authentication required to send messages. Redirecting to login...");
            setTimeout(() => {
                navigate("/login", { state: { message: "Please log in before submitting a support ticket." } });
            }, 2500);
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            setError("Please fill out all required fields.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({
                    name: "",
                    email: "",
                    subject: contactConstants.form.fields.subject.options[0],
                    message: ""
                });
            } else {
                throw new Error(data.error || "Failed to send message.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
                <LucideIcons.Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-24">
                <div className="max-w-2xl">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
                    >
                        {contactConstants.header.subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-8"
                    >
                        {contactConstants.header.titleLine1} <br /> <span className="italic serif">{contactConstants.header.titleLine2}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground/50 max-w-lg leading-relaxed"
                    >
                        {contactConstants.header.description}
                    </motion.p>
                </div>
            </section>

            {/* Main Grid */}
            <section className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-secondary/30 p-12 lg:p-16 border border-foreground/5 relative"
                    >
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {success && (
                                <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-4 font-medium text-sm border border-green-500/20">
                                    Message sent successfully! We will get back to you shortly.
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-500/10 text-red-700 dark:text-red-400 p-4 font-medium text-sm border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">{contactConstants.form.fields.fullName.label}</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder={contactConstants.form.fields.fullName.placeholder}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        readOnly={!!session?.user}
                                        className={`w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors disabled:opacity-50 ${session?.user ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">{contactConstants.form.fields.email.label}</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder={contactConstants.form.fields.email.placeholder}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        readOnly={!!session?.user}
                                        className={`w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors disabled:opacity-50 ${session?.user ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">{contactConstants.form.fields.subject.label}</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    disabled={loading}
                                    className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors appearance-none cursor-pointer disabled:opacity-50"
                                >
                                    {contactConstants.form.fields.subject.options.map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">{contactConstants.form.fields.message.label}</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder={contactConstants.form.fields.message.placeholder}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    disabled={loading}
                                    className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading}
                                className="w-full h-16 rounded-none bg-primary text-white hover:bg-accent transition-all group disabled:opacity-50"
                            >
                                {loading ? "Sending..." : contactConstants.form.buttonText}
                                {!loading && <LucideIcons.ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-16"
                    >
                        <div>
                            <h3 className="text-xl font-display mb-8">{contactConstants.details.studios.title}</h3>
                            <div className="space-y-10">
                                {contactConstants.details.studios.locations.map((loc, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-white flex items-center justify-center border border-foreground/5 shadow-sm shrink-0">
                                            <LucideIcons.MapPin size={20} className="text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm mb-2">{loc.city}</h4>
                                            <p className="text-sm text-foreground/50 leading-loose">
                                                {loc.addressLine1} <br />
                                                {loc.addressLine2}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-display mb-8">{contactConstants.details.communication.title}</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <a href={`mailto:${contactConstants.details.communication.email}`} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <LucideIcons.Mail size={16} />
                                    </div>
                                    <span className="text-sm font-medium">{contactConstants.details.communication.email}</span>
                                </a>
                                <a href={`tel:${contactConstants.details.communication.phoneLink}`} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <LucideIcons.Phone size={16} />
                                    </div>
                                    <span className="text-sm font-medium">{contactConstants.details.communication.phone}</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-display mb-8">{contactConstants.details.social.title}</h3>
                            <div className="flex gap-4">
                                {[LucideIcons.Instagram, LucideIcons.Facebook, LucideIcons.Twitter].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 border border-foreground/10 flex items-center justify-center rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 transition-all">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="container mx-auto px-6 mt-32">
                <div className="w-full h-96 relative grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                        src={contactConstants.mapImage}
                        alt="Map detail"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
                </div>
            </section>
        </div>
    );
}
