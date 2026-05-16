import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Stethoscope,
  UserRound,
  ShieldCheck,
  Thermometer,
  ChevronRight,
  Star,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is Om Clinic located in Rajkot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Om Clinic is located at 119, Savan Signet Commercial, Opp. Tulsi Supermarket, Raiya Road, Rajkot – 360007, Gujarat."
      }
    },
    {
      "@type": "Question",
      "name": "What are Om Clinic's opening hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monday to Saturday: 9:30 AM – 1:00 PM and 4:30 PM – 9:00 PM. Sunday: 9:00 AM – 1:00 PM and 4:30 PM – 8:00 PM."
      }
    },
    {
      "@type": "Question",
      "name": "How can I book an appointment at Om Clinic Rajkot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book online at omclinicrajkot.com/appointment or call/WhatsApp +91 94269 93723."
      }
    }
  ]
};

export default function Home() {

  const services = [
    { title: "Preventive Care", icon: ShieldCheck, desc: "Routine check-ups and screenings to keep you ahead of illness.", color: "text-blue-600 bg-blue-50" },
    { title: "Accurate Diagnosis", icon: Stethoscope, desc: "Thorough evaluation to identify the root cause precisely.", color: "text-teal-600 bg-teal-50" },
    { title: "Chronic Disease", icon: Activity, desc: "Long-term management of diabetes, hypertension, thyroid & more.", color: "text-indigo-600 bg-indigo-50" },
    { title: "Family Healthcare", icon: UserRound, desc: "Compassionate treatment for patients of every age.", color: "text-green-600 bg-green-50" },
    { title: "Acute Illness", icon: Thermometer, desc: "Prompt care for fever, infections, and sudden medical issues.", color: "text-rose-600 bg-rose-50" },
    { title: "Cardiac & BP Care", icon: HeartPulse, desc: "Monitoring and management of heart health and blood pressure.", color: "text-orange-600 bg-orange-50" },
  ];

  const testimonials = [
    { name: "Rahul P.", rating: 5, text: "Dr. Chirag is incredibly patient. He listens carefully and explains the treatment clearly. Best doctor in Rajkot." },
    { name: "Meera S.", rating: 5, text: "A very clean and calm clinic. I've been bringing my children here for years and always feel reassured." },
    { name: "Amit K.", rating: 5, text: "Highly recommend Om Clinic. Professional, honest, and truly caring. Never felt rushed." },
  ];

  const stats = [
    { label: "Years Experience", value: "6+" },
    { label: "Patients Served", value: "5000+" },
    { label: "Services Offered", value: "10+" },
    { label: "Days Open", value: "7" },
  ];

  return (
    <Layout>
      <SEO
        title="Om Clinic Rajkot | Dr. Chirag Santoki BHMS – Best Clinic in Rajkot"
        description="Om Clinic Rajkot – Dr. Chirag Santoki (BHMS) provides expert general medicine, chronic disease management, family healthcare & preventive care in Raiya, Rajkot. Open 7 days. Call +91 94269 93723."
        canonical="https://omclinicrajkot.com/"
        keywords="Om Clinic Rajkot, Dr Chirag Santoki, clinic in Rajkot, best clinic Rajkot, BHMS doctor Rajkot, general medicine Rajkot, family doctor Rajkot"
        schema={homeSchema}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 md:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-7 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                Trusted Clinic in Rajkot since 2020
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 leading-tight">
                Honest Care,<br />
                <span className="text-primary">Every Visit.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed">
                Dr. Chirag Santoki brings over 6 years of experience to Om Clinic — a place where you are heard, respected, and cared for as family.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/appointment">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-md hover:shadow-lg transition-shadow">
                    <CalendarCheck size={17} className="mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-medium border-slate-300 hover:border-primary hover:text-primary">
                    Meet Dr. Santoki
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> Mon–Sat: 9:30 AM – 9 PM</span>
                <span className="flex items-center gap-1.5"><Phone size={14} className="text-primary" /> +91 94269 93723</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> Raiya, Rajkot</span>
              </div>
            </motion.div>

            {/* Right panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-100 aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10" />
                <div className="relative text-center space-y-3 p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Stethoscope className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-2xl text-slate-800">Dr. Chirag Santoki</p>
                    <p className="text-sm text-muted-foreground mt-1">BHMS</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 pt-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                    <span className="text-xs text-slate-500 ml-1">Highly Rated</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-green-600" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-slate-800">Open Today</p>
                  <p className="text-[10px] text-muted-foreground">9:30 AM – 1:00 PM</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CalendarCheck size={18} className="text-blue-600" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-slate-800">Easy Booking</p>
                  <p className="text-[10px] text-muted-foreground">Online slots available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="space-y-1"
              >
                <p className="text-3xl md:text-4xl font-serif font-bold text-white">{s.value}</p>
                <p className="text-sm text-primary-foreground/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center space-y-5"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              A Quietly Confident Approach to Healing
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We believe medicine should be approachable and honest. Whether it's a routine check-up, managing a chronic condition, or a sudden illness — Om Clinic is a reassuring space where you are truly heard.
            </p>
            <Link href="/about">
              <Button variant="ghost" className="text-primary hover:text-primary font-medium mt-2">
                Learn about Dr. Santoki <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center space-y-3 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Treat</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Our Medical Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Comprehensive care tailored to your needs, from acute illness to long-term health management.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${service.color}`}>
                  <service.icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" className="font-medium border-slate-300 hover:border-primary hover:text-primary">
                View All Services <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent)]" />
        <div className="container mx-auto px-4 md:px-6 text-center relative space-y-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-5"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Ready to Book Your Visit?</h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Choose your preferred slot online or call us directly. Dr. Santoki is available 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/appointment">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-50 font-semibold h-12 px-8 shadow-lg">
                  <CalendarCheck size={17} className="mr-2" />
                  Book Online
                </Button>
              </Link>
              <a href="tel:+919426993723">
                <Button size="lg" className="bg-white/10 border border-white/40 text-white hover:bg-white/20 h-12 px-8 font-medium backdrop-blur-sm">
                  <Phone size={16} className="mr-2" />
                  +91 94269 93723
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center space-y-3 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">What Patients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-100 relative"
              >
                <div className="text-5xl text-primary/15 font-serif absolute top-4 right-6 leading-none select-none">"</div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
