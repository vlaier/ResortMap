import express from "express";
import { state } from "./state/state";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/resort", (req, res) => {
  res.json(state.getResortLayout());
});

app.listen(PORT);
