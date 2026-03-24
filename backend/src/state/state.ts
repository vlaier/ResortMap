import fs from "node:fs";
import type { Booking, LegendKeys, ResortObject } from "./types";

const RESORT_MAP_PATH = "./src/map.ascii";
const BOOKINGS_PATH = "./src/bookings.json";

class ResortState {
  private bookings: Booking[] = [];
  private resortLayout: ResortObject[][] = [];
  private static instance: ResortState;

  private constructor() {
    this.readResortMap();
    this.readBookings();
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new ResortState();
    }
    return this.instance;
  }
  readResortMap() {
    const data = fs.readFileSync(RESORT_MAP_PATH, "utf-8");
    const lines = data.split("\n");
    this.resortLayout = lines.map((line) =>
      line.split("").map((char) => {
        const type = char as LegendKeys;
        if (type === "W") {
          return {
            id: crypto.randomUUID(),
            type,
            isBooked: false,
            bookedBy: null,
          };
        }
        return {
          id: crypto.randomUUID(),
          type,
        };
      }),
    );
  }
  readBookings() {
    const data = fs.readFileSync(BOOKINGS_PATH, "utf-8");
    this.bookings = JSON.parse(data) as Booking[];
  }
  findCabanaById(cabanaId: string) {
    for (const row of this.resortLayout) {
      for (const obj of row) {
        if (obj.type === "W" && obj.id === cabanaId) {
          return obj;
        }
      }
    }
    return null;
  }
  bookCabana(cabanaId: string, booking: Booking) {
    const cabana = this.findCabanaById(cabanaId);
    if (!cabana) {
      return new Error("Cabana not found");
    }
    if (cabana.isBooked) {
      return new Error("Cabana already booked");
    }
    cabana.isBooked = true;
    cabana.bookedBy = booking;
  }
}
export const state = ResortState.getInstance();
