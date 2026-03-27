import React from "react";
import type { ResortObject } from "../types/types";
import { renderResortTile } from "../utils/renderResortTile";
import { useCabanaBooking } from "../hooks/useCabanaBooking";

type ResortMapStyle = React.CSSProperties & {
  "--mobile-tile-size": string;
};

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
  const maxColumns = Math.max(...resortLayout.map((row) => row.length), 1);
  const resortMapStyle: ResortMapStyle = {
    "--mobile-tile-size": `clamp(0.72rem, calc((100vw - 3.75rem) / ${maxColumns}), 1.7rem)`,
  };

  const handleSubmitBooking = (e: React.SubmitEvent<HTMLFormElement>) => {
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
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-wrap gap-2.5" aria-label="Map legend">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(120,92,60,0.12)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-sm text-[#453a31] transition-transform duration-200 hover:-translate-y-0.5">
            <span className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#2f9e62]" />
            Available cabana
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(120,92,60,0.12)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-sm text-[#453a31] transition-transform duration-200 hover:-translate-y-0.5">
            <span className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#d45a4b]" />
            Booked cabana
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(120,92,60,0.12)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-sm text-[#453a31] transition-transform duration-200 hover:-translate-y-0.5">
            <span className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#34a4d8]" />
            Pool
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(120,92,60,0.12)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-sm text-[#453a31] transition-transform duration-200 hover:-translate-y-0.5">
            <span className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#8c6842]" />
            Chalet
          </div>
        </div>
      </div>

      {showBookingForm && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-[rgba(25,21,17,0.48)] p-4 backdrop-blur-[6px]"
          role="presentation"
          onClick={() => setShowBookingForm(false)}
        >
          <div
            className="w-full max-w-120 rounded-3xl border border-[rgba(116,86,49,0.14)] bg-[#fffaf2] p-5 shadow-[0_30px_80px_rgba(24,18,12,0.24)] animate-[resort-soft-pop_220ms_ease-out_both]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
              <div>
                <p className="mb-2 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-[#8a6236]">
                  Reservation
                </p>
                <h3
                  id="booking-title"
                  className="font-[Georgia,Times_New_Roman,serif] text-[1.55rem] leading-[1.05] text-[#1f1811]"
                >
                  Book cabana {selectedCabanaId}
                </h3>
              </div>
              <button
                type="button"
                className="rounded-[14px] bg-[rgba(31,24,17,0.08)] px-4 py-3 font-semibold text-[#2e241a]"
                onClick={() => setShowBookingForm(false)}
              >
                Close
              </button>
            </div>

            <p className="my-4 text-[#5c5147]">
              Add the guest details below to reserve this premium cabana."
            </p>

            <form className="grid gap-4" onSubmit={handleSubmitBooking}>
              <label className="grid gap-1.5 text-left font-semibold text-[#3c3228]">
                <span>Guest name</span>
                <input
                  type="text"
                  name="guestName"
                  placeholder="Alicja Kowalska"
                  className="w-full rounded-[14px] border border-[rgba(120,92,60,0.16)] bg-[rgba(255,255,255,0.88)] px-4 py-3 text-[#1f1811] outline-2 outline-transparent transition focus:border-[rgba(47,158,98,0.5)] focus:outline-[rgba(47,158,98,0.25)]"
                  required
                />
              </label>

              <label className="grid gap-1.5 text-left font-semibold text-[#3c3228]">
                <span>Room number</span>
                <input
                  type="number"
                  name="room"
                  placeholder="204"
                  min="1"
                  className="w-full rounded-[14px] border border-[rgba(120,92,60,0.16)] bg-[rgba(255,255,255,0.88)] px-4 py-3 text-[#1f1811] outline-2 outline-transparent transition focus:border-[rgba(47,158,98,0.5)] focus:outline-[rgba(47,158,98,0.25)]"
                  required
                />
              </label>

              <button
                type="submit"
                className="rounded-[14px] bg-[#1f1811] px-4 py-3 font-bold text-[#fffaf2] disabled:opacity-60"
                disabled={query.isPending}
              >
                {query.isPending ? "Booking..." : "Confirm booking"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="w-full overflow-hidden">
        <div
          className="mx-auto flex w-fit max-w-full flex-col items-center gap-0"
          style={resortMapStyle}
          role="img"
          aria-label="Resort layout map"
        >
          {resortLayout.map((row: ResortObject[], rowIndex: number) => (
            <div key={rowIndex} className="flex justify-center gap-0">
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
        </div>
      </div>
    </React.Fragment>
  );
}
