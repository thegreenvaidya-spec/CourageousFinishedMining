import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Clock, ChevronRight, CalendarCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.09 },
  }),
};

const posts = [
  {
    title: "Managing Diabetes in Your Daily Life",
    category: "Chronic Disease",
    categoryColor: "text-indigo-600 bg-indigo-50",
    date: "May 2026",
    read: "5 min read",
    excerpt:
      "Diabetes management is not just about medication — it's about consistent habits. Discover practical strategies for controlling blood sugar through diet, movement, and smart monitoring.",
  },
  {
    title: "Why Regular Blood Pressure Checks Matter",
    category: "Heart Health",
    categoryColor: "text-rose-600 bg-rose-50",
    date: "April 2026",
    read: "4 min read",
    excerpt:
      "Hypertension is called the 'silent killer' for a reason. Learn why checking your blood pressure regularly is one of the most important preventive steps you can take.",
  },
  {
    title: "Understanding Fever: When to Worry",
    category: "Acute Illness",
    categoryColor: "text-orange-600 bg-orange-50",
    date: "March 2026",
    read: "3 min read",
    excerpt:
      "Not every fever needs an ER visit — but some do. Dr. Santoki explains the signs that distinguish a manageable fever from one requiring urgent attention.",
  },
  {
    title: "The Importance of Preventive Health Check-Ups",
    category: "Preventive Care",
    categoryColor: "text-teal-600 bg-teal-50",
    date: "February 2026",
    read: "4 min read",
    excerpt:
      "Annual health screenings catch problems before they become serious. Find out what a basic check-up covers and why it's worth scheduling one this year.",
  },
  {
    title: "Thyroid Disorders: What You Should Know",
    category: "Chronic Disease",
    categoryColor: "text-indigo-600 bg-indigo-50",
    date: "January 2026",
    read: "6 min read",
    excerpt:
      "Fatigue, weight changes, mood swings — thyroid issues present in many ways. Learn how thyroid disorders are diagnosed and what modern management looks like.",
  },
  {
    title: "Healthy Habits for the Whole Family",
    category: "Family Health",
    categoryColor: "text-green-600 bg-green-50",
    date: "December 2025",
    read: "4 min read",
    excerpt:
      "Small, consistent actions create lifelong health. Dr. Santoki shares simple evidence-based habits that every family can adopt — at any age.",
  },
];

export default function Blog() {
  useEffect(() => {
    document.title = "Health Blog | Om Clinic Rajkot";
  }, []);

  const [featured, ...rest] = posts;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Health Insights</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">Om Clinic Blog</h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto mt-4">
              Practical health advice and medical insights from Dr. Chirag Santoki.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Featured post */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-slate-100 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="md:flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${featured.categoryColor}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={11} /> {featured.read}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">{featured.title}</h2>
                <p className="text-slate-500 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs text-slate-400">{featured.date}</span>
                  <span className="text-xs text-primary font-medium flex items-center gap-1 cursor-default">
                    Read article <ChevronRight size={13} />
                  </span>
                </div>
              </div>
              <div className="md:w-52 w-full h-32 md:h-44 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                <div className="text-center space-y-1">
                  <div className="text-4xl font-serif text-primary/20">ॐ</div>
                  <p className="text-xs text-slate-400">Featured</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-slate-800 text-lg mb-3 leading-snug">{post.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={11} />
                    {post.read} · {post.date}
                  </div>
                  <span className="text-xs text-primary font-medium flex items-center gap-1 cursor-default">
                    Read <ChevronRight size={13} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-xl text-center space-y-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-4"
          >
            <h2 className="text-2xl font-serif font-bold text-slate-900">Have a Health Concern?</h2>
            <p className="text-slate-500">Don't leave it to guesswork. Book a consultation with Dr. Santoki for an accurate, honest assessment.</p>
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
