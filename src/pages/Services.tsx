import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Stethoscope, HeartPulse, Activity, UserRound, ShieldCheck, Thermometer, Brain, Pill, ChevronRight, CalendarCheck } from "lucide-react";
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

export default function Services() {

  const services = [
    {
      title: "Accurate Diagnosis",
      desc: "Utilizing thorough evaluation and clinical examination techniques to identify the root cause of your symptoms precisely and effectively.",
      icon: Stethoscope,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Preventive Healthcare",
      desc: "Routine check-ups, health screenings, and lifestyle counselling to keep you ahead of illness and maintain optimal well-being.",
      icon: ShieldCheck,
      color: "text-teal-600 bg-teal-50",
    },
    {
      title: "Chronic Disease Management",
      desc: "Expert long-term care for diabetes, hypertension, asthma, thyroid disorders, and other ongoing conditions — monitored and managed closely.",
      icon: Activity,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Family Healthcare",
      desc: "Comprehensive medical services for every member of your family — from children to seniors — all under one roof.",
      icon: UserRound,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Fever & Acute Illness",
      desc: "Prompt diagnosis and effective treatment for fever, viral infections, common colds, UTIs, and other sudden medical issues.",
      icon: Thermometer,
      color: "text-rose-600 bg-rose-50",
    },
    {
      title: "Cardiac & Blood Pressure",
      desc: "Monitoring and ongoing management of heart health, hypertension, and related cardiovascular risk factors.",
      icon: HeartPulse,
      color: "text-orange-600 bg-orange-50",
    },
    {
      title: "Respiratory Care",
      desc: "Diagnosis and treatment of asthma, COPD, bronchitis, and other respiratory conditions with personalised management plans.",
      icon: Brain,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Medication Management",
      desc: "Safe review, adjustment, and guidance on medications to ensure optimal effectiveness and minimal side effects.",
      icon: Pill,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      title: "Compassionate Consultation",
      desc: "A judgment-free, patient-first approach where you are always heard, respected, and given ample time during each visit.",
      icon: HeartPulse,
      color: "text-pink-600 bg-pink-50",
    },
  ];

  return (
    <Layout>
      <SEO
        title="Medical Services | Om Clinic Rajkot – Dr. Chirag Santoki"
        description="Om Clinic Rajkot offers expert general medicine, diabetes management, hypertension care, fever treatment, respiratory care, family healthcare and more. Dr. Chirag Santoki, BHMS. Raiya, Rajkot."
        canonical="https://omclinicrajkot.com/services"
        keywords="general medicine Rajkot, diabetes treatment Rajkot, hypertension doctor Rajkot, fever treatment Rajkot, family healthcare Rajkot, Om Clinic services"
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">Our Medical Services</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-4">
              Delivering comprehensive, personalized medical care. At Om Clinic, we treat the whole person — not just the symptoms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.color}`}>
                  <s.icon size={22} />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center space-y-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Ready to Get Started?</h2>
            <p className="text-slate-500">Book a consultation with Dr. Chirag Santoki and take the first step towards better health.</p>
            <Link href="/appointment">
              <Button size="lg" className="h-12 px-8 font-semibold shadow-sm mt-2">
                <CalendarCheck size={17} className="mr-2" />
                Book an Appointment
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
