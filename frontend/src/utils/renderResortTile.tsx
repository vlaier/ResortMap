import type { Dispatch, SetStateAction } from "react";
import type { ResortObject } from "../types/types";
import { choosePathImage } from "./choosePathImage";
import { getNeighbours } from "./getNeighbours";
import cabanaImage from "../assets/cabana.png";
import poolImage from "../assets/pool.png";
import chaletImage from "../assets/houseChimney.png";

const interactiveTileClassName =
  "flex h-[var(--mobile-tile-size)] w-[var(--mobile-tile-size)] shrink-0 items-center justify-center rounded-[max(6px,calc(var(--mobile-tile-size)*0.3))] border transition sm:h-8 sm:w-8 sm:rounded-[12px] md:h-9 md:w-9 md:rounded-[13px] lg:h-10 lg:w-10 lg:rounded-[14px] xl:h-11 xl:w-11 xl:rounded-[16px]";

const staticTileClassName =
  "flex h-[var(--mobile-tile-size)] w-[var(--mobile-tile-size)] shrink-0 items-center justify-center sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11";

export const renderResortTile = (
  layout: ResortObject,
  resortLayout: ResortObject[][],
  rowIndex: number,
  cellIndex: number,
  setShowBookingForm: Dispatch<SetStateAction<boolean>>,
  setSelectedCabanaId: Dispatch<SetStateAction<string | null>>,
) => {
  const handleCabanaClick = () => {
    if (layout.type !== "W") return;
    if (layout.isBooked) return;
    setShowBookingForm(true);
    setSelectedCabanaId(layout.id);
  };
  switch (layout.type) {
    case "W":
      return (
        <button
          type="button"
          onClick={handleCabanaClick}
          disabled={layout.isBooked}
          className={`${interactiveTileClassName} shadow-[0_10px_16px_rgba(46,35,20,0.1)] ${
            layout.isBooked
              ? "cursor-not-allowed border-[rgba(183,88,76,0.2)] bg-[linear-gradient(180deg,rgba(255,236,232,0.98),rgba(248,207,199,0.94))] saturate-90"
              : "cursor-pointer border-[rgba(70,140,86,0.25)] bg-[linear-gradient(180deg,rgba(236,251,241,0.96),rgba(204,239,215,0.95))] hover:-translate-y-0.5 hover:border-[rgba(64,113,75,0.38)] hover:shadow-[0_16px_26px_rgba(46,35,20,0.14)] focus-visible:-translate-y-0.5 focus-visible:border-[rgba(64,113,75,0.38)] focus-visible:shadow-[0_16px_26px_rgba(46,35,20,0.14)] focus-visible:outline-none"
          }`}
          aria-label={
            layout.isBooked
              ? `Cabana ${layout.id} booked by ${layout.bookedBy?.guestName ?? "guest"}`
              : `Book cabana ${layout.id}`
          }
          title={
            layout.isBooked
              ? `Booked by ${layout.bookedBy?.guestName ?? "guest"}`
              : `Cabana ${layout.id} is available`
          }
        >
          <img
            src={cabanaImage}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className="h-[calc(var(--mobile-tile-size)*0.58)] w-[calc(var(--mobile-tile-size)*0.58)] object-contain sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6"
          />
        </button>
      );
    case "p":
      return (
        <div
          className={`${interactiveTileClassName} cursor-default border-transparent bg-[radial-gradient(circle_at_30%_30%,rgba(119,225,255,0.75),rgba(35,133,201,0.95))]`}
          title="Pool zone"
        >
          <img
            src={poolImage}
            alt="Pool"
            width={26}
            height={26}
            className="h-[calc(var(--mobile-tile-size)*0.62)] w-[calc(var(--mobile-tile-size)*0.62)] object-contain sm:h-5 sm:w-5 md:h-5.5 md:w-5.5 lg:h-6.5 lg:w-6.5"
          />
        </div>
      );
    case "#": {
      const neighbours = getNeighbours(resortLayout, rowIndex, cellIndex);
      const { path, rotation } = choosePathImage(neighbours);

      return (
        <div className={staticTileClassName} aria-hidden="true">
          <img
            src={path}
            alt=""
            width={48}
            height={48}
            className="h-[110%] w-[110%] object-contain opacity-90"
            style={{ transform: `rotate(${rotation})` }}
          />
        </div>
      );
    }
    case "c":
      return (
        <div
          className={`${interactiveTileClassName} cursor-default border-transparent bg-[linear-gradient(180deg,rgba(245,232,207,0.95),rgba(214,182,141,0.95))]`}
          title="Chalet"
        >
          <img
            src={chaletImage}
            alt="Chalet"
            width={26}
            height={26}
            className="h-[calc(var(--mobile-tile-size)*0.62)] w-[calc(var(--mobile-tile-size)*0.62)] object-contain sm:h-5 sm:w-5 md:h-5.5 md:w-5.5 lg:h-6.5 lg:w-6.5"
          />
        </div>
      );
    default:
      return <div className={staticTileClassName} aria-hidden="true" />;
  }
};
