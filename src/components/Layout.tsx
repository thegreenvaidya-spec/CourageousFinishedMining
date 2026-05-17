import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, CalendarCheck, Stethoscope, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Om Clinic Rajkot – Home">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Stethoscope className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <p className="font-serif font-bold text-slate-900 text-base leading-none">Om Clinic</p>
              <p className="text-[10px] text-muted-foreground font-medium">Dr. Chirag Santoki</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location === link.href
                    ? "text-primary bg-primary/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+919426993723" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors font-medium" aria-label="Call Om Clinic">
              <Phone size={14} aria-hidden="true" />
              +91 94269 93723
            </a>
            <Link href="/appointment">
              <Button size="sm" className="gap-1.5 font-semibold shadow-sm">
                <CalendarCheck size={14} aria-hidden="true" />
                Book Appointment
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                location === link.href
                  ? "text-primary bg-primary/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a href="tel:+919426993723" className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 font-medium">
              <Phone size={15} className="text-primary" aria-hidden="true" /> +91 94269 93723
            </a>
            <Link href="/appointment" onClick={() => setOpen(false)}>
              <Button className="w-full gap-2 font-semibold" size="sm">
                <CalendarCheck size={14} aria-hidden="true" /> Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300" aria-label="Site footer">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="leading-tight">
                <p className="font-serif font-bold text-white text-base leading-none">Om Clinic</p>
                <p className="text-[10px] text-slate-400">Dr. Chirag Santoki, BHMS</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Trusted general medicine clinic in Rajkot, Gujarat. Serving the Raiya community with honest, compassionate care since 2020.
            </p>
            <a
              href="https://wa.me/919426993723"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
              aria-label="Chat with Om Clinic on WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/appointment" className="text-sm text-primary hover:text-blue-300 font-medium transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </nav>

          <address className="not-italic space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact &amp; Location</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p>
                119, Savan Signet Commercial<br />
                Opp. Tulsi Supermarket, Raiya Road<br />
                <strong className="text-slate-300">Rajkot – 360007, Gujarat, India</strong>
              </p>
              <a href="tel:+919426993723" className="flex items-center gap-2 hover:text-white transition-colors font-medium">
                <Phone size={14} className="text-primary" aria-hidden="true" />
                +91 94269 93723
              </a>
              <div className="space-y-1 pt-1">
                <p className="font-medium text-slate-300">Clinic Hours</p>
                <p>Mon–Sat: 9:30 AM – 1 PM &amp; 4:30 – 9 PM</p>
                <p>Sunday: 9 AM – 1 PM &amp; 4:30 – 8 PM</p>
              </div>
            </div>
          </address>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Om Clinic, Rajkot, Gujarat. All rights reserved.</p>
          <p>Om Clinic · 119 Savan Signet Commercial, Raiya, Rajkot 360007 · +91 94269 93723</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919426993723?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Om%20Clinic."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Om Clinic on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 px-4 py-3 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 shrink-0"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.119 1.535 5.849L.057 23.215a.75.75 0 00.918.934l5.498-1.432A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.5-5.287-1.376l-.378-.215-3.924 1.022 1.053-3.808-.233-.386A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      <span className="text-sm font-semibold whitespace-nowrap">WhatsApp Us</span>
    </a>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1" id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
