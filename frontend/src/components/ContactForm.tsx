"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Phone, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { API_ROUTES } from "@/lib/config";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitStatus("idle");
      
      const response = await fetch(API_ROUTES.CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };


  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Side: Visual & Info */}
            <div className="bg-slate-50 p-6 sm:p-10 lg:p-14 text-gray-900 relative flex flex-col justify-between">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2071&auto=format&fit=crop"
                  alt="Background"
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              <div className="relative z-10">
                <span className="text-[#FF9500] font-black tracking-[0.2em] uppercase text-[10px] mb-6 block">Contact Us</span>
                <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tighter text-gray-900">
                  Let&apos;s start a <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#007AFF] to-[#00C7FF]">conversation.</span>
                </h2>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 max-w-xs">
                  Have questions about our training programs or placement support? Our team is ready to help you build your future.
                </p>

                <div className="space-y-6">


                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#007AFF] transition-all duration-500 shadow-lg border border-gray-100">
                      <MapPin size={22} className="text-[#007AFF] group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm mb-1">Hyderabad Branch</h4>
                      <p className="text-gray-500 text-[11px] font-bold leading-relaxed">
                        1-7-224, Dilsukhnagar, Hyderabad-500060
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#34C759] transition-all duration-500 shadow-lg border border-gray-100">
                      <Phone size={22} className="text-[#34C759] group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm mb-1">Call Us Direct</h4>
                      <p className="text-gray-500 text-[11px] font-bold leading-relaxed">+91 97030 54999 / 64999</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-10 flex space-x-4">
                <div className="h-1.5 w-12 bg-[#FF9500] rounded-full"></div>
                <div className="h-1.5 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-1.5 w-4 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-6 sm:p-10 lg:p-14 bg-white backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-gray-100">
              <div className="max-w-md mx-auto lg:mx-0">
                <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight text-center lg:text-left">Send us a message</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      {...register("name")}
                      className={`px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:bg-white transition-all ${errors.name ? "border-orange-500" : "focus:ring-2 focus:ring-blue-500"}`}
                    />
                    {errors.name && <p className="text-[10px] font-bold text-orange-600 mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        className={`px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:bg-white transition-all ${errors.email ? "border-orange-500" : "focus:ring-2 focus:ring-blue-500"}`}
                      />
                      {errors.email && <p className="text-[10px] font-bold text-orange-600 mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 00000 00000"
                        {...register("phone")}
                        className={`px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:bg-white transition-all ${errors.phone ? "border-orange-500" : "focus:ring-2 focus:ring-blue-500"}`}
                      />
                      {errors.phone && <p className="text-[10px] font-bold text-orange-600 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      {...register("subject")}
                      className={`px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:bg-white transition-all ${errors.subject ? "border-orange-500" : "focus:ring-2 focus:ring-blue-500"}`}
                    />
                    {errors.subject && <p className="text-[10px] font-bold text-orange-600 mt-1">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      rows={4}
                      {...register("message")}
                      className={`px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:bg-white transition-all ${errors.message ? "border-orange-500" : "focus:ring-2 focus:ring-blue-500"}`}
                    />
                    {errors.message && <p className="text-[10px] font-bold text-orange-600 mt-1">{errors.message.message}</p>}
                  </div>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center border border-green-100"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="font-bold text-xs">Message sent successfully! We&apos;ll reach out soon.</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-orange-50 text-orange-700 rounded-xl flex items-center border border-orange-200"
                    >
                      <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="font-bold text-xs">Something went wrong. Please try again.</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#007AFF] hover:bg-[#005FB8] text-white py-6 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
