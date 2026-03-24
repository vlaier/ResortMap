import type { UUID } from "node:crypto";

const Legend = {
  W: "cabana",
  p: "pool",
  "#": "path",
  c: "chalet",
  ".": "empty",
} as const;
type Legend = typeof Legend;
export type LegendKeys = keyof typeof Legend;
export type LegendValues = Legend[LegendKeys];

export type Booking = {
  id: UUID;
  name: string;
  room: number;
};

export type ResortObject =
  | {
      id: UUID;
      type: "W";
      isBooked: boolean;
      bookedBy: Booking | null;
    }
  | {
      id: UUID;
      type: Exclude<LegendKeys, "W">;
    };
