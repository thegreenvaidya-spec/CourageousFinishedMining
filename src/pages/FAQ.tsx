import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CalendarCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book online through our appointment page — simply pick a date and available time slot. Alternatively, call or WhatsApp us at +91 94269 93723 and we'll schedule you directly.",
  },
  {
    q: "What are the clinic hours?",
    a: "Monday to Saturday: 9:30 AM – 1:00 PM and 4:30 PM – 9:00 PM. Sunday: 9:00 AM – 1:00 PM and 4:30 PM – 8:00 PM. We are open 7 days a week for your convenience.",
  },
  {
    q: "Does Om Clinic treat children?",
    a: "Yes. Dr. Santoki provides family healthcare for patients of all ages, including children. We offer a calm, reassuring environment for young patients.",
  },
  {
    q: "What conditions does Dr. Santoki treat?",
    a: "Dr. Santoki manages a wide range of conditions including fever, infections, diabetes, hypertension, asthma, thyroid disorders, respiratory illness, and general medical concerns.",
  },
  {
    q: "Do I need to book in advance or can I walk in?",
    a: "Walk-ins are welcome, but booking in advance is recommended to minimize wait times. Online booking lets you choose a specific time slot with availability shown in real time.",
  },
  {
    q: "How many patients are seen per slot?",
    a: "Each one-hour slot accommodates a maximum of 3 patients. This ensures Dr. Santoki gives adequate time and attention to every person.",
  },
  {
    q: "Is the clinic available on public holidays?",
    a: "Availability on public holidays may vary. Please call or WhatsApp +91 94269 93723 in advance to confirm on those days.",
  },
  {
    q: "Where is Om Clinic located?",
    a: "Om Clinic is at 119, Savan Signet Commercial, opposite Tulsi Supermarket, Raiya, Rajkot – 360007, Gujarat. Search 'Om Clinic Dr. Chirag Santoki' on Google Maps.",
  },
  {
    q: "Do you provide prescription refills?",
    a: "Yes. If you are an existing patient with an ongoing condition, Dr. Santoki can review and renew prescriptions. Please schedule an appointment so he can review your current health status.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={i}
      variants={fadeUp}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${open ? "border-primary/30 shadow-sm" : "border-slate-100 bg-white hover:border-slate-200"}`}
    >
      <button
        className="w-full flex items-center justify-between text-left px-6 py-5 gap-4 bg-white"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-primary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4 bg-white">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

export default function FAQ() {
  return (
    <Layout>
      <SEO
        title="FAQ – Om Clinic Rajkot | Dr. Chirag Santoki"
        description="Answers to common questions about Om Clinic Rajkot — booking appointments, clinic hours, services offered by Dr. Chirag Santoki (BHMS), location in Raiya Rajkot, and more."
        canonical="https://omclinicrajkot.com/faq"
        keywords="Om Clinic FAQ, Om Clinic timings, Dr Chirag Santoki appointment, clinic Rajkot questions"
        schema={faqSchema}
      />
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Common Questions</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">Frequently Asked Questions</h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto mt-4">
              Everything you need to know before your visit to Om Clinic.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-xl text-center space-y-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-4"
          >
            <h2 className="text-2xl font-serif font-bold text-slate-900">Still Have Questions?</h2>
            <p className="text-slate-500">
              Call or WhatsApp us at{" "}
              <a href="tel:+919426993723" className="text-primary font-medium hover:underline">
                +91 94269 93723
              </a>{" "}
              and we'll be happy to help.
            </p>
            <Link href="/appointment">
              <Button size="lg" className="h-12 px-8 font-semibold mt-2">
                <CalendarCheck size={17} className="mr-2" />
                Book an Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
