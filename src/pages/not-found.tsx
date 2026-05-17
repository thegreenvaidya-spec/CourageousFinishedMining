import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <SEO
        title="Page Not Found | Om Clinic Rajkot"
        description="The page you are looking for does not exist. Return to Om Clinic Rajkot's homepage."
        canonical="https://omclinicrajkot.com/"
      />
      <section className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-3">404</h1>
          <p className="text-lg text-slate-500 mb-2">Page Not Found</p>
          <p className="text-sm text-slate-400 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2 font-semibold">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
