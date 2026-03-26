import type { ResortObject } from "../types/types";

export const getNeighbours = (
  resortLayout: ResortObject[][],
  rowIndex: number,
  columnIndex: number,
) => {
  return {
    left: resortLayout[rowIndex]?.[columnIndex - 1],
    right: resortLayout[rowIndex]?.[columnIndex + 1],
    top: resortLayout[rowIndex - 1]?.[columnIndex],
    bottom: resortLayout[rowIndex + 1]?.[columnIndex],
  };
};
