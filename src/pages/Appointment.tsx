import { useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Clock, Sun, Moon, Phone, CheckCircle2 } from "lucide-react";

interface SlotInfo {
  slot: string;
  booked: number;
  available: boolean;
}

interface SlotsResponse {
  date: string;
  isSunday: boolean;
  morning: SlotInfo[];
  evening: SlotInfo[];
  maxPerSlot: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Appointment() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", reason: "" });
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<SlotsResponse | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!form.date) {
      setSlots(null);
      setSelectedSlot("");
      return;
    }
    setLoadingSlots(true);
    setSelectedSlot("");
    fetch(`/api/appointment/slots?date=${form.date}`)
      .then((r) => r.json())
      .then((data: SlotsResponse) => setSlots(data))
      .catch(() =>
        toast({ title: "Could not load slots", description: "Please try again.", variant: "destructive" })
      )
      .finally(() => setLoadingSlots(false));
  }, [form.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast({ title: "Please select a time slot", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timeSlot: selectedSlot }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: err instanceof Error ? err.message : "Please call us directly.",
        variant: "destructive",
      });
      if (form.date) {
        fetch(`/api/appointment/slots?date=${form.date}`)
          .then((r) => r.json())
          .then((data: SlotsResponse) => setSlots(data))
          .catch(() => null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const SlotButton = ({ s }: { s: SlotInfo }) => {
    const isSelected = selectedSlot === s.slot;
    const spotsLeft = 3 - s.booked;
    return (
      <button
        type="button"
        disabled={!s.available}
        onClick={() => setSelectedSlot(s.slot)}
        data-testid={`slot-${s.slot}`}
        className={`rounded-xl border-2 px-3 py-3 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full
          ${!s.available
            ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
            : isSelected
            ? "border-primary bg-primary text-white shadow-md"
            : "border-slate-200 bg-white hover:border-primary/50 hover:bg-primary/3 cursor-pointer"
          }`}
      >
        <span className="block font-semibold text-sm">{s.slot}</span>
        <span className={`text-xs mt-0.5 block font-medium ${
          !s.available ? "text-slate-300" : isSelected ? "text-white/75" : spotsLeft === 1 ? "text-orange-500" : "text-slate-400"
        }`}>
          {!s.available ? "Full" : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
        </span>
      </button>
    );
  };

  if (submitted) {
    return (
      <Layout>
        <SEO
          title="Appointment Confirmed | Om Clinic Rajkot"
          description="Your appointment request at Om Clinic Rajkot has been received. Dr. Chirag Santoki's team will confirm your slot shortly."
          canonical="https://omclinicrajkot.com/appointment"
        />
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4 md:px-6 max-w-lg text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Appointment Requested!</h2>
                <p className="text-slate-500 leading-relaxed">
                  Your request for <span className="font-semibold text-slate-700">{selectedSlot}</span> on <span className="font-semibold text-slate-700">{form.date}</span> has been received.<br />
                  Dr. Santoki's team will call you at <span className="font-semibold text-slate-700">{form.phone}</span> to confirm.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 text-sm text-slate-500 flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                For urgent queries, call us at <a href="tel:+919426993723" className="text-primary font-semibold ml-1">+91 94269 93723</a>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 font-medium"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", phone: "", date: "", reason: "" });
                  setSelectedSlot("");
                  setSlots(null);
                }}
              >
                Book Another Appointment
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Book an Appointment | Om Clinic Rajkot – Dr. Chirag Santoki"
        description="Book an appointment online at Om Clinic Rajkot. Choose your preferred date and time slot with Dr. Chirag Santoki (BHMS). Available Monday–Sunday in Raiya, Rajkot."
        canonical="https://omclinicrajkot.com/appointment"
        keywords="book doctor appointment Rajkot, Om Clinic appointment, Dr Chirag Santoki booking, online appointment Rajkot clinic"
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Schedule a Visit</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">Book an Appointment</h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto mt-4">
              Choose your preferred date and time slot. Dr. Santoki's team will confirm via phone.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="bg-primary px-8 py-5 flex items-center gap-3">
              <CalendarCheck className="text-white w-5 h-5" />
              <span className="text-white font-semibold">Appointment Details</span>
            </div>

            <form onSubmit={handleSubmit} className="p-7 md:p-9 space-y-7">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={form.name}
                    onChange={handleChange}
                    data-testid="input-name"
                    className="h-11 rounded-xl border-slate-200 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    data-testid="input-phone"
                    className="h-11 rounded-xl border-slate-200 focus:border-primary"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold text-slate-700">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  data-testid="input-date"
                  className="h-11 rounded-xl border-slate-200 focus:border-primary max-w-xs"
                />
              </div>

              {/* Slots */}
              {form.date && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-slate-700">
                      Select Time Slot
                    </Label>
                    {slots && (
                      <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                        {slots.isSunday ? "Sunday hours" : "Mon – Sat hours"} · max 3/slot
                      </span>
                    )}
                  </div>

                  {loadingSlots ? (
                    <div className="flex items-center gap-3 text-sm text-slate-400 py-6">
                      <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      Loading available slots...
                    </div>
                  ) : slots ? (
                    <div className="space-y-5">
                      {slots.morning.length > 0 && (
                        <div className="space-y-3">
                          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <Sun size={13} /> Morning
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {slots.morning.map((s) => <SlotButton key={s.slot} s={s} />)}
                          </div>
                        </div>
                      )}
                      {slots.evening.length > 0 && (
                        <div className="space-y-3">
                          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <Moon size={13} /> Evening
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {slots.evening.map((s) => <SlotButton key={s.slot} s={s} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-semibold text-slate-700">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Briefly describe your symptoms or reason for consultation..."
                  className="min-h-[100px] rounded-xl border-slate-200 focus:border-primary bg-white"
                  required
                  value={form.reason}
                  onChange={handleChange}
                  data-testid="textarea-reason"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold shadow-sm"
                disabled={isSubmitting || !selectedSlot}
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CalendarCheck size={17} />
                    Confirm Appointment Request
                  </span>
                )}
              </Button>

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3.5 text-xs text-amber-700">
                <Clock size={13} className="mt-0.5 shrink-0" />
                For medical emergencies, please visit the nearest hospital emergency room directly.
              </div>
            </form>
          </motion.div>

          {/* Side info */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mt-5 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col sm:flex-row gap-5 items-center justify-between"
          >
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-slate-700 mb-0.5">Prefer to call?</p>
              <p className="text-xs text-slate-400">We'll book you in right away</p>
            </div>
            <a href="tel:+919426993723">
              <Button variant="outline" size="sm" className="font-semibold border-slate-200 gap-2">
                <Phone size={14} /> +91 94269 93723
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
