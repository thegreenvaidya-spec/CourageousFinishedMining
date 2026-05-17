import express, { Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const ADMIN_PASSWORD = "Chiragsantoki";
function requireAdmin(req: Request, res: Response, next: () => void) {
  const pw = req.headers["x-admin-password"];
  if (!pw || pw !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get("/api/appointment/slots", async (req: Request, res: Response) => {
  const { date } = req.query as { date?: string };
  if (!date) {
    res.status(400).json({ error: "date is required" });
    return;
  }

  try {
    const d = new Date(date);
    const day = d.getDay();
    const isSunday = day === 0;
    const maxPerSlot = 3;

    const morning = isSunday
      ? ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"]
      : ["9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"];

    const evening = isSunday
      ? ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"]
      : ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];

    const result = await pool.query(
      "SELECT time_slot, COUNT(*) as booked FROM appointments WHERE date = $1 AND status != 'cancelled' GROUP BY time_slot",
      [date]
    );

    const bookings: Record<string, number> = {};
    for (const row of result.rows) {
      bookings[row.time_slot] = parseInt(row.booked, 10);
    }

    const buildSlots = (slots: string[]) =>
      slots.map((slot) => {
        const booked = bookings[slot] ?? 0;
        return { slot, booked, available: booked < maxPerSlot };
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

app.post("/api/appointment", async (req: Request, res: Response) => {
  const { name, phone, date, timeSlot, reason } = req.body;

  if (!name || !phone || !date || !timeSlot || !reason) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const countResult = await pool.query(
      "SELECT COUNT(*) as booked FROM appointments WHERE date = $1 AND time_slot = $2 AND status != 'cancelled'",
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

app.get("/api/appointments", requireAdmin, async (req: Request, res: Response) => {
  const { date, status, search } = req.query as { date?: string; status?: string; search?: string };

  try {
    let query = "SELECT * FROM appointments WHERE 1=1";
    const params: (string | number)[] = [];
    let idx = 1;

    if (date) { query += ` AND date = $${idx++}`; params.push(date); }
    if (status) { query += ` AND status = $${idx++}`; params.push(status); }
    if (search) {
      query += ` AND (name ILIKE $${idx} OR phone ILIKE $${idx} OR reason ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    query += " ORDER BY date DESC, time_slot ASC";
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("List error:", err);
    res.status(500).json({ error: "Could not load appointments" });
  }
});

app.get("/api/appointments/stats", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const [totalResult, todayResult, pendingResult, confirmedResult, cancelledResult] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM appointments"),
      pool.query("SELECT COUNT(*) FROM appointments WHERE date = $1", [today]),
      pool.query("SELECT COUNT(*) FROM appointments WHERE status = 'pending'"),
      pool.query("SELECT COUNT(*) FROM appointments WHERE status = 'confirmed'"),
      pool.query("SELECT COUNT(*) FROM appointments WHERE status = 'cancelled'"),
    ]);
    res.json({
      total: parseInt(totalResult.rows[0].count, 10),
      today: parseInt(todayResult.rows[0].count, 10),
      pending: parseInt(pendingResult.rows[0].count, 10),
      confirmed: parseInt(confirmedResult.rows[0].count, 10),
      cancelled: parseInt(cancelledResult.rows[0].count, 10),
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Could not load stats" });
  }
});

app.patch("/api/appointments/:id", requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  try {
    await pool.query("UPDATE appointments SET status = $1 WHERE id = $2", [status, id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Could not update appointment" });
  }
});

app.delete("/api/appointments/:id", requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Could not delete appointment" });
  }
});

export default app;
