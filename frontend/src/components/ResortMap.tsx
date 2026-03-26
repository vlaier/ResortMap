import React from "react";
import type { ResortObject } from "../types/types";
import { renderResortTile } from "../utils/renderResortTile";
import { useCabanaBooking } from "../hooks/useCabanaBooking";

export function ResortMap({
  resortLayout,
}: {
  resortLayout: ResortObject[][];
}) {
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const [selectedCabanaId, setSelectedCabanaId] = React.useState<string | null>(
    null,
  );
  const query = useCabanaBooking();

  const handleSubmitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCabanaId) return;
    const formData = new FormData(e.currentTarget);
    const guestName = formData.get("guestName") as string;
    const room = formData.get("room") as string;
    query.mutate({
      cabanaId: selectedCabanaId,
      bookingData: { guestName, room: parseInt(room, 10) },
    });
    setShowBookingForm(false);
  };
  return (
    <React.Fragment>
      {showBookingForm && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 100,
            background: "white",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h3>Booking Form for Cabana {selectedCabanaId}</h3>
          <form onSubmit={handleSubmitBooking}>
            <input type="text" name="guestName" placeholder="Name" />
            <input type="text" name="room" placeholder="Room" />
            <button type="submit">Book</button>
          </form>
          <button onClick={() => setShowBookingForm(false)}>Close</button>
        </div>
      )}
      {resortLayout.map((row: ResortObject[], rowIndex: number) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <React.Fragment key={cell.id}>
              {renderResortTile(
                cell,
                resortLayout,
                rowIndex,
                cellIndex,
                setShowBookingForm,
                setSelectedCabanaId,
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
}
