import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Om Clinic Rajkot";
  }, []);

  const infoCards = [
    {
      icon: MapPin,
      label: "Location",
      color: "text-blue-600 bg-blue-50",
      content: (
        <>
          <p>119, Savan Signet Commercial</p>
          <p>Opp. Tulsi Supermarket, Raiya</p>
          <p>Rajkot – 360007, Gujarat</p>
          <a
            href="https://www.google.com/maps/dir//Om+Clinic+Dr.Chirag+Santoki,+119+Om+Clinic,+Savan+signet+complex,+Raiya+Rd,+near+Alap+Green+city,+Rajkot,+Gujarat+360007/@22.3084661,70.7522908,14z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3959c9b70289c533:0x669d0d79c11d17e2!2m2!1d70.7546787!2d22.3003024"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline mt-2"
          >
            Get directions <ChevronRight size={12} />
          </a>
        </>
      ),
    },
    {
      icon: Phone,
      label: "Phone & WhatsApp",
      color: "text-green-600 bg-green-50",
      content: (
        <>
          <a href="tel:+919426993723" className="font-semibold text-slate-800 hover:text-primary transition-colors">
            +91 94269 93723
          </a>
          <p className="text-xs text-slate-500 mt-1">Available on WhatsApp</p>
          <a
            href="https://wa.me/919426993723"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium hover:underline mt-2"
          >
            <MessageCircle size={12} /> Chat on WhatsApp
          </a>
        </>
      ),
    },
    {
      icon: Clock,
      label: "Clinic Hours",
      color: "text-orange-600 bg-orange-50",
      content: (
        <div className="space-y-2 text-sm">
          <div>
            <p className="font-semibold text-slate-700">Monday – Saturday</p>
            <p>9:30 AM – 1:00 PM</p>
            <p>4:30 PM – 9:00 PM</p>
          </div>
          <div className="pt-1">
            <p className="font-semibold text-slate-700">Sunday</p>
            <p>9:00 AM – 1:00 PM</p>
            <p>4:30 PM – 8:00 PM</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Reach Us</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">Get in Touch</h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto mt-4">
              We are here to help. Reach out for appointments, directions, or any health inquiry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: info cards */}
            <div className="lg:col-span-2 space-y-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={fadeUp}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-start gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                    <card.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-2">{card.label}</h3>
                    <div className="text-sm text-slate-500 leading-relaxed space-y-0.5">
                      {card.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Book appointment nudge */}
              <motion.div
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
                className="bg-primary rounded-2xl p-5 text-white"
              >
                <h3 className="font-semibold text-base mb-1">Book Online</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">Select your preferred slot in seconds — no waiting on the phone.</p>
                <Link href="/appointment">
                  <Button size="sm" className="bg-white text-primary hover:bg-slate-50 font-semibold w-full">
                    Book Appointment
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right: map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3 space-y-3"
            >
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-[480px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4!2d70.7546787!3d22.3003024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c9b70289c533%3A0x669d0d79c11d17e2!2sOm%20Clinic%20Dr.Chirag%20Santoki!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Om Clinic Location Map"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 px-1">
                <MapPin size={14} className="text-primary shrink-0" />
                119, Savan Signet Commercial, Opp. Tulsi Supermarket, Raiya, Rajkot – 360007
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
