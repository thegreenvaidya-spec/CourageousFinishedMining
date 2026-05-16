import express, { Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Get available slots for a date
app.get("/api/appointment/slots", async (req: Request, res: Response) => {
  const { date } = req.query as { date?: string };
  if (!date) {
    res.status(400).json({ error: "date is required" });
    return;
  }

  try {
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sunday
    const isSunday = day === 0;

    const maxPerSlot = 3;

    // Morning slots
    const morning = isSunday
      ? ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"]
      : ["9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"];

    // Evening slots
    const evening = isSunday
      ? ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"]
      : ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];

    // Count existing bookings for this date per slot
    const result = await pool.query(
      "SELECT time_slot, COUNT(*) as booked FROM appointments WHERE date = $1 GROUP BY time_slot",
      [date]
    );

    const bookings: Record<string, number> = {};
    for (const row of result.rows) {
      bookings[row.time_slot] = parseInt(row.booked, 10);
    }

    const buildSlots = (slots: string[]) =>
      slots.map((slot) => {
        const booked = bookings[slot] ?? 0;
        return {
          slot,
          booked,
          available: booked < maxPerSlot,
        };
      });

    res.json({
      date,
      isSunday,
      morning: buildSlots(morning),
      evening: buildSlots(evening),
      maxPerSlot,
    });
  } catch (err) {
    console.error("Slots error:", err);
    res.status(500).json({ error: "Could not load slots" });
  }
});

// Book an appointment
app.post("/api/appointment", async (req: Request, res: Response) => {
  const { name, phone, date, timeSlot, reason } = req.body;

  if (!name || !phone || !date || !timeSlot || !reason) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    // Check if slot is still available
    const countResult = await pool.query(
      "SELECT COUNT(*) as booked FROM appointments WHERE date = $1 AND time_slot = $2",
      [date, timeSlot]
    );
    const booked = parseInt(countResult.rows[0].booked, 10);
    if (booked >= 3) {
      res.status(409).json({ error: "This slot is now full. Please choose another." });
      return;
    }

    await pool.query(
      "INSERT INTO appointments (name, phone, date, time_slot, reason) VALUES ($1, $2, $3, $4, $5)",
      [name, phone, date, timeSlot, reason]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Could not book appointment" });
  }
});

// List all appointments (for admin)
app.get("/api/appointments", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM appointments ORDER BY date DESC, time_slot ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("List error:", err);
    res.status(500).json({ error: "Could not load appointments" });
  }
});

const PORT = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server running on port ${PORT}`);
});
