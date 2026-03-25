import express from "express";
import { state } from "./state/state";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/resort", (req, res) => {
  res.json(state.getResortLayout());
});

app.listen(PORT);
