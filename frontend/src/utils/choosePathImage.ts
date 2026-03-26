import type { ResortObject } from "../types/types";

type PathNeighbours = Record<string, ResortObject | undefined>;

export const choosePathImage = (neighbours?: PathNeighbours) => {
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowCrossing.png", rotation: 0 };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowSplit.png", rotation: 0 };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowSplit.png", rotation: "-90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowSplit.png", rotation: "90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowSplit.png", rotation: "180deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowStraight.png", rotation: 0 };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowStraight.png", rotation: "90deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowCornerSquare.png", rotation: 0 };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowCornerSquare.png", rotation: "90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowCornerSquare.png", rotation: "-90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowCornerSquare.png", rotation: "180deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: "./src/assets/arrowEnd.png", rotation: "0deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowEnd.png", rotation: "180deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowEnd.png", rotation: "90deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: "./src/assets/arrowEnd.png", rotation: "-90deg" };

  return { path: "./src/assets/arrowEnd.png", rotation: 0 };
};
