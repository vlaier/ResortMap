import type { ResortObject } from "../types/types";
import { choosePathImage } from "./choosePathImage";
import { getNeighbours } from "./getNeighbours";

export const renderResortTile = (
  layout: ResortObject,
  resortLayout: ResortObject[][],
  rowIndex: number,
  cellIndex: number,
  setShowBookingForm: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCabanaId: React.Dispatch<React.SetStateAction<string | null>>,
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
        <img
          src="./src/assets/cabana.png"
          alt="Cabana"
          width={20}
          height={20}
          onClick={() => handleCabanaClick()}
          style={{
            background: layout.isBooked ? "red" : "green",
            cursor: layout.isBooked ? "not-allowed" : "pointer",
            borderRadius: "4px",
            backgroundBlendMode: "overlay",
          }}
        />
      );
    case "p":
      return (
        <img src="./src/assets/pool.png" alt="Pool" width={20} height={20} />
      );
    case "#": {
      const neighbours = getNeighbours(resortLayout, rowIndex, cellIndex);
      const { path, rotation } = choosePathImage(neighbours);

      return (
        <img
          src={path}
          alt="Path"
          width={20}
          height={20}
          style={{ transform: `rotate(${rotation})` }}
        />
      );
    }
    case "c":
      return (
        <img
          src="./src/assets/houseChimney.png"
          alt="Chalet"
          width={20}
          height={20}
        />
      );
    default:
      return (
        <div
          style={{
            width: 20,
            height: 20,
          }}
        />
      );
  }
};
