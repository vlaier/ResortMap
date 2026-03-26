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
  getResortLayout() {
    return this.resortLayout;
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
  checkIfBookingDataIsValid(bookingData: Booking) {
    const filtredBookings = this.bookings.filter((booking) => {
      return (
        booking.guestName === bookingData?.guestName &&
        Number(booking.room) === bookingData?.room
      );
    });
    return !!filtredBookings.length;
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
      throw new Error("Cabana not found");
    }
    if (cabana.isBooked) {
      throw new Error("Cabana already booked");
    }
    cabana.isBooked = true;
    cabana.bookedBy = booking;
    console.log("Cabana booked successfully", { cabanaId, booking });
  }
}
export const state = ResortState.getInstance();
