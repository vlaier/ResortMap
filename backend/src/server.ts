import express from "express";
import { state } from "./state/state";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/resort", (_, res) => {
  res.json(state.getResortLayout());
});
app.post("/book/:cabanaId", (req, res) => {
  const { cabanaId } = req.params;
  const bookingData = req.body;
  if (!state.checkIfBookingDataIsValid(bookingData)) {
    return res.status(400).json({ error: "Invalid booking data" });
  }
  try {
    state.bookCabana(cabanaId, bookingData);
    res.json({ message: "Booking successful" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.listen(PORT);
