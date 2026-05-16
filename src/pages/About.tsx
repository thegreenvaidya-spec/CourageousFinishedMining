import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

export default function About() {
  useEffect(() => {
    document.title = "About Dr. Chirag Santoki | Om Clinic Rajkot";
  }, []);

  const highlights = [
    "Listens carefully to understand the full patient history",
    "Evidence-based treatment plans tailored to each individual",
    "Fluent in Gujarati, Hindi, and English",
    "Open 7 days a week for your convenience",
    "Transparent consultation with clear explanations",
  ];

  const credentials = [
    { icon: GraduationCap, label: "Education", value: "MBBS, MD (General Medicine)" },
    { icon: Award, label: "Experience", value: "6+ Years in Healthcare" },
    { icon: BookOpen, label: "Specialties", value: "Internal Medicine, Diabetes, Hypertension" },
  ];

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Doctor</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">Meet Dr. Chirag Santoki</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-4">
              A dedicated physician committed to personalized, evidence-based medical care for the Rajkot community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Left: photo placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-100 shadow-lg flex flex-col items-center justify-center gap-4 relative">
                <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="text-5xl font-serif text-primary font-bold">ॐ</span>
                </div>
                <div className="text-center">
                  <p className="font-serif font-bold text-2xl text-slate-800">Dr. Chirag Santoki</p>
                  <p className="text-sm text-slate-500 mt-1">MBBS, MD – General Medicine</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-primary py-4 text-center">
                  <p className="text-white font-semibold text-sm">Om Clinic, Rajkot</p>
                  <p className="text-primary-foreground/70 text-xs">Est. 2020</p>
                </div>
              </div>
            </motion.div>

            {/* Right: bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p className="text-lg">
                  Dr. Chirag Santoki founded Om Clinic in 2020 with a simple philosophy: medicine should be honest, accessible, and compassionate. With over 6 years of experience, he handles a wide spectrum of health concerns — from acute illnesses to complex chronic condition management.
                </p>
                <p>
                  He believes an accurate diagnosis begins with listening. By taking the time to understand each patient's unique history and lifestyle, Dr. Santoki crafts treatment plans that are practical, effective, and truly tailored to the individual.
                </p>
                <p>
                  At Om Clinic, you are not just a file number. You are a neighbor, a family member, and a valued patient. Dr. Santoki strives to create an environment where you feel reassured and confident in your care.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-slate-600 text-sm">{h}</span>
                  </motion.div>
                ))}
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                {credentials.map((c) => (
                  <div key={c.label} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <c.icon className="text-primary w-5 h-5" />
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">{c.label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.value}</p>
                  </div>
                ))}
              </div>

              <Link href="/appointment">
                <Button size="lg" className="h-11 px-8 font-semibold shadow-sm">
                  Book a Consultation <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Values</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">What We Stand For</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Honesty", desc: "Straightforward advice without unnecessary tests or medications." },
              { label: "Compassion", desc: "Every patient is treated with kindness, patience, and respect." },
              { label: "Accessibility", desc: "Affordable care, open 7 days, and easy to reach by phone." },
            ].map((v, i) => (
              <motion.div
                key={v.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary font-bold text-lg font-serif">
                  {v.label[0]}
                </div>
                <h3 className="font-semibold text-slate-800">{v.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
