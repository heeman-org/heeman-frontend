import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Button } from "../components/ui/Button";
import { useConstants } from "../context/ConstantsContext";
import { authClient } from "../lib/auth-client";
import { Skeleton } from "../components/ui/Skeleton";

export default function Contact() {
    const { data: session, isPending } = authClient.useSession();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const enquirySectionRef = useRef<HTMLDivElement>(null);
    const { contactConstants, loading: constantsLoading } = useConstants();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Custom enquiry form state
    const [enquiryData, setEnquiryData] = useState({ name: "", email: "", phone: "", message: "" });
    const [enquiryImages, setEnquiryImages] = useState<File[]>([]);
    const [enquiryLoading, setEnquiryLoading] = useState(false);
    const [enquirySuccess, setEnquirySuccess] = useState(false);
    const [enquiryError, setEnquiryError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (contactConstants && !formData.subject) {
            setFormData(prev => ({ ...prev, subject: contactConstants.form.fields.subject.options[0] }));
        }
    }, [contactConstants]);

    // Scroll to enquiry section if redirected from landing page
    useEffect(() => {
        if (searchParams.get("enquiry") === "true" && enquirySectionRef.current) {
            setTimeout(() => {
                enquirySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
        }
    }, [searchParams, constantsLoading]);

    // Populate user data once session is loaded
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || "",
                email: session.user.email || ""
            }));
            setEnquiryData(prev => ({
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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setEnquiryImages(prev => {
            const combined = [...prev, ...files];
            return combined.slice(0, 5); // max 5 images
        });
        // Reset input so same file can be re-selected if removed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = (index: number) => {
        setEnquiryImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!enquiryData.name || !enquiryData.email || !enquiryData.message) {
            setEnquiryError("Please fill out all required fields.");
            return;
        }
        setEnquiryLoading(true);
        setEnquiryError("");
        setEnquirySuccess(false);

        try {
            const form = new FormData();
            form.append("name", enquiryData.name);
            form.append("email", enquiryData.email);
            form.append("phone", enquiryData.phone);
            form.append("message", enquiryData.message);
            enquiryImages.forEach(img => form.append("images", img));

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiry`, {
                method: "POST",
                body: form,
            });
            const data = await res.json();
            if (data.success) {
                setEnquirySuccess(true);
                setEnquiryData({ name: session?.user?.name || "", email: session?.user?.email || "", phone: "", message: "" });
                setEnquiryImages([]);
            } else {
                throw new Error(data.error || "Failed to submit enquiry.");
            }
        } catch (err: any) {
            setEnquiryError(err.message || "Failed to submit. Please try again.");
        } finally {
            setEnquiryLoading(false);
        }
    };

    if (isPending || constantsLoading || !contactConstants) {
        return (
            <div className="pt-32 pb-24 min-h-screen container mx-auto px-6">
                <div className="max-w-2xl mb-24">
                    <Skeleton className="h-4 w-32 mb-6 bg-gray-200 rounded-sm" />
                    <Skeleton className="h-16 w-3/4 mb-8 bg-gray-300 rounded-sm" />
                    <Skeleton className="h-24 w-full bg-gray-200 rounded-sm" />
                </div>
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    <Skeleton className="w-full h-[600px] bg-gray-300 rounded-none" />
                    <div className="space-y-16">
                        <Skeleton className="h-32 w-full bg-gray-200 rounded-sm" />
                        <Skeleton className="h-32 w-full bg-gray-200 rounded-sm" />
                        <Skeleton className="h-32 w-full bg-gray-200 rounded-sm" />
                    </div>
                </div>
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
                        className="text-accent font-bold tracking-[0.3em] uppercase text-md mb-6 block"
                    >
                        {contactConstants.header.subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-8"
                    >
                        {contactConstants.header.titleLine1} <br /> <span className="font-medium">{contactConstants.header.titleLine2}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground/60 max-w-lg leading-relaxed"
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
                                    <label className="text-xs uppercase tracking-widest font-semibold opacity-50">{contactConstants.form.fields.fullName.label}</label>
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
                                    <label className="text-xs uppercase tracking-widest font-semibold opacity-50">{contactConstants.form.fields.email.label}</label>
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
                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">{contactConstants.form.fields.subject.label}</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    disabled={loading}
                                    className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors appearance-none cursor-pointer disabled:opacity-50"
                                >
                                    {contactConstants.form.fields.subject.options.map((opt: string, i: number) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">{contactConstants.form.fields.message.label}</label>
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
                                {contactConstants.details.studios.locations.map((loc: any, i: number) => (
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

            {/* Custom Enquiry Section */}
            <section ref={enquirySectionRef} className="container mx-auto px-6 mt-32" id="custom-enquiry">
                <div className="max-w-2xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
                    >
                        Custom Orders
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display mb-6"
                    >
                        Enquiry Now
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground/60 leading-relaxed"
                    >
                        Share your custom product request. Upload reference images to help us understand exactly what you want.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-secondary/30 p-12 lg:p-16 border border-foreground/5 max-w-4xl"
                >
                    <form onSubmit={handleEnquirySubmit} className="space-y-8">
                        {enquirySuccess && (
                            <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-4 font-medium text-sm border border-green-500/20 flex items-center gap-3">
                                <LucideIcons.CheckCircle2 size={18} />
                                Your enquiry has been submitted! We'll get back to you shortly.
                            </div>
                        )}
                        {enquiryError && (
                            <div className="bg-red-500/10 text-red-700 dark:text-red-400 p-4 font-medium text-sm border border-red-500/20">
                                {enquiryError}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Full Name *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your full name"
                                    value={enquiryData.name}
                                    onChange={e => setEnquiryData({ ...enquiryData, name: e.target.value })}
                                    readOnly={!!session?.user}
                                    className={`w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors ${session?.user ? "opacity-70 cursor-not-allowed" : ""}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Email Address *</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={enquiryData.email}
                                    onChange={e => setEnquiryData({ ...enquiryData, email: e.target.value })}
                                    readOnly={!!session?.user}
                                    className={`w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors ${session?.user ? "opacity-70 cursor-not-allowed" : ""}`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                placeholder="+91 00000 00000"
                                value={enquiryData.phone}
                                onChange={e => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                                disabled={enquiryLoading}
                                className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-semibold opacity-50">Describe Your Product *</label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Describe the product you want — style, colour, material, size, quantity, occasion, or anything else that helps us understand your vision..."
                                value={enquiryData.message}
                                onChange={e => setEnquiryData({ ...enquiryData, message: e.target.value })}
                                disabled={enquiryLoading}
                                className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors resize-none"
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
                                disabled={enquiryLoading || enquiryImages.length >= 5}
                            />

                            {/* Upload trigger */}
                            {enquiryImages.length < 5 && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={enquiryLoading}
                                    className="w-full border-2 border-dashed border-foreground/10 hover:border-accent/40 transition-colors py-10 flex flex-col items-center gap-3 text-foreground/40 hover:text-accent group"
                                >
                                    <LucideIcons.Upload size={28} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Click to upload images</span>
                                    <span className="text-xs">JPG, PNG, WEBP up to 10MB each</span>
                                </button>
                            )}

                            {/* Image previews */}
                            {enquiryImages.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                    {enquiryImages.map((img, i) => (
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
                                    {enquiryImages.length < 5 && (
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
                            disabled={enquiryLoading}
                            className="w-full h-16 rounded-none bg-primary text-white hover:bg-accent transition-all group disabled:opacity-50"
                        >
                            {enquiryLoading ? "Submitting..." : "Submit Enquiry"}
                            {!enquiryLoading && <LucideIcons.ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />}
                        </Button>
                    </form>
                </motion.div>
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
