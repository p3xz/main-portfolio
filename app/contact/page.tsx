"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Instagram, ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import BubbleMenu from "@/components/BubbleMenu";
import Footer from "@/components/sections/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import SmoothScroll from "@/components/SmoothScroll";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // First attempt: Next.js API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success !== false) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback directly to FormSubmit
        const fallbackRes = await fetch("https://formsubmit.co/ajax/nam4sh@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _replyto: formData.email,
            _subject: `[Portfolio Contact] ${formData.subject || 'Inquiry from ' + formData.name}`,
            message: formData.message,
            _captcha: "false",
          }),
        });

        if (fallbackRes.ok) {
          setSubmitStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setSubmitStatus("error");
        }
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden">
        <GlobalBackground />

        {/* Bubble Menu Navigation */}
        <BubbleMenu
          logo={<span className="font-bold text-[#0a0a0f]">Namish</span>}
          menuBg="#ffffff"
          menuContentColor="#0a0a0f"
          useFixedPosition={true}
        />

        {/* Contact Section */}
        <section className="relative z-10 min-h-[90dvh] flex items-center justify-center px-6 py-32">
          <div className="w-full max-w-xl mx-auto">
            
            {/* Back to Home Link */}
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </div>

            {/* Header */}
            <div className="mb-10 space-y-2">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                Contact
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Get in Touch
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Have an engineering role, project inquiry, or technical question? Send a message directly or reach out via email.
              </p>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-5 shadow-lg"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium text-neutral-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-md text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-md text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-medium text-neutral-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Software Engineering Opportunity / Project Inquiry"
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-md text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium text-neutral-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your project, role specifications, or inquiry..."
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-md text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-white text-neutral-950 font-semibold text-sm rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm focus-visible:outline-2 focus-visible:outline-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status Notifications */}
              {submitStatus === "success" && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message sent successfully. I will get back to you promptly.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Failed to send automatically.</span>
                  </div>
                  <p className="text-neutral-400">
                    You can send your message directly via your email client to{" "}
                    <a
                      href={`mailto:nam4sh@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(formData.message)}`}
                      className="text-white underline hover:text-neutral-200 transition-colors"
                    >
                      nam4sh@gmail.com
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>

            {/* Direct Contact Links */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] text-center space-y-4">
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Direct Channels
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="mailto:nam4sh@gmail.com"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  nam4sh@gmail.com
                </a>

                <a
                  href="https://github.com/p3xz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/namish-yadav-639769408/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>

                <a
                  href="https://instagram.com/namishyadv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
