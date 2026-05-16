import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, CalendarCheck, Stethoscope } from "lucide-react";
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="font-serif font-bold text-slate-900 text-base leading-none">Om Clinic</p>
              <p className="text-[10px] text-muted-foreground font-medium">Dr. Chirag Santoki</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location === link.href
                    ? "text-primary bg-primary/8"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+919426993723" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors font-medium">
              <Phone size={14} />
              +91 94269 93723
            </a>
            <Link href="/appointment">
              <Button size="sm" className="gap-1.5 font-semibold shadow-sm">
                <CalendarCheck size={14} />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
                  ? "text-primary bg-primary/8"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a href="tel:+919426993723" className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 font-medium">
              <Phone size={15} className="text-primary" /> +91 94269 93723
            </a>
            <Link href="/appointment" onClick={() => setOpen(false)}>
              <Button className="w-full gap-2 font-semibold" size="sm">
                <CalendarCheck size={14} /> Book Appointment
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
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <p className="font-serif font-bold text-white text-base leading-none">Om Clinic</p>
                <p className="text-[10px] text-slate-400">Dr. Chirag Santoki</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Honest, compassionate general medicine in Rajkot. Open 7 days a week for your convenience.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p>119, Savan Signet Commercial<br />Opp. Tulsi Supermarket, Raiya<br />Rajkot – 360007, Gujarat</p>
              <a href="tel:+919426993723" className="flex items-center gap-2 hover:text-white transition-colors font-medium">
                <Phone size={14} className="text-primary" />
                +91 94269 93723
              </a>
              <div className="space-y-1">
                <p className="font-medium text-slate-300">Hours</p>
                <p>Mon–Sat: 9:30 AM – 1 PM, 4:30 – 9 PM</p>
                <p>Sunday: 9 AM – 1 PM, 4:30 – 8 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Om Clinic, Rajkot. All rights reserved.</p>
          <p>Designed with care for the Rajkot community.</p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
