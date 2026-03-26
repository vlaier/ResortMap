import type { ResortObject } from "../types/types";
import arrowCornerSquare from "../assets/arrowCornerSquare.png";
import arrowCrossing from "../assets/arrowCrossing.png";
import arrowEnd from "../assets/arrowEnd.png";
import arrowSplit from "../assets/arrowSplit.png";
import arrowStraight from "../assets/arrowStraight.png";

type PathNeighbours = Record<string, ResortObject | undefined>;

export const choosePathImage = (neighbours?: PathNeighbours) => {
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowCrossing, rotation: "0deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowSplit, rotation: "0deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowSplit, rotation: "-90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowSplit, rotation: "90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowSplit, rotation: "180deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowStraight, rotation: "0deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowStraight, rotation: "90deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowCornerSquare, rotation: "0deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowCornerSquare, rotation: "90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowCornerSquare, rotation: "-90deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowCornerSquare, rotation: "180deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type === "#"
  )
    return { path: arrowEnd, rotation: "0deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type === "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowEnd, rotation: "180deg" };
  if (
    neighbours?.left?.type === "#" &&
    neighbours?.right?.type !== "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowEnd, rotation: "90deg" };
  if (
    neighbours?.left?.type !== "#" &&
    neighbours?.right?.type === "#" &&
    neighbours?.top?.type !== "#" &&
    neighbours?.bottom?.type !== "#"
  )
    return { path: arrowEnd, rotation: "-90deg" };

  return { path: arrowEnd, rotation: "0deg" };
};
