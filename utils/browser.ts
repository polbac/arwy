import { WindowSize, getWindowSize } from "@/components/Window";

const MARGIN = 15;
const FOLDER_WIDTH = 100;
const FOLDER_HEIGHT = 250;

export function getRandomXYPositions(): { x: number; y: number } {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }
  const browserWidth = window.innerWidth - MARGIN * 2;
  const browserHeight = window.innerHeight - MARGIN * 2;

  return {
    x: MARGIN + Math.random() * (browserWidth - FOLDER_WIDTH),
    y: MARGIN + Math.random() * (browserHeight - FOLDER_HEIGHT),
  };
}

export function getWindowPosition(
  preferredX: number,
  preferredY: number,
  windowSize: WindowSize
): { x: number; y: number } {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  const size = getWindowSize(windowSize);

  const browserWidth = window.innerWidth;
  const browserHeight = window.innerHeight;

  const offsetX = (browserWidth / 2 - preferredX) / 20;
  const offsetY = (browserHeight / 2 - preferredY) / 10;

  let x = browserWidth / 2 - size.width / 2 - offsetX;
  let y = browserHeight / 2 - size.height / 2 - offsetY;

  return { x, y };
}
