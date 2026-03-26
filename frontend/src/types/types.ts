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
  id: string;
  guestName: string;
  room: number;
};

export type ResortObject =
  | {
      id: string;
      type: "W";
      isBooked: boolean;
      bookedBy: Booking | null;
    }
  | {
      id: string;
      type: Exclude<LegendKeys, "W">;
    };
