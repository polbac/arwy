import { getRandomXYPositions, getWindowPosition } from "@/utils/browser";
import { FC, useEffect, useState } from "react";
import Draggable from "react-draggable";

export enum WindowSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const WINDOW_SIZE: Record<WindowSize, { width: number; height: number }> = {
  [WindowSize.SMALL]: { width: 400, height: 200 },
  [WindowSize.MEDIUM]: { width: 640, height: 340 },
  [WindowSize.LARGE]: { width: 960, height: 560 },
};

export function getWindowSize(size: WindowSize): {
  width: number;
  height: number;
} {
  return WINDOW_SIZE[size];
}

export const Window: FC<{
  children: React.ReactNode;
  title: string;
  className: string;
  x: number;
  y: number;
  onClose: () => void;
  windowSize: WindowSize;
  data: unknown;
}> = ({ children, title, className, x, y, onClose, windowSize, data }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => setPosition(getWindowPosition(x, y, windowSize)), []);

  if (position.x === 0) {
    return null;
  }
  console.log("data", data);
  return (
    <Draggable
      defaultPosition={{
        x: position.x,
        y: position.y,
      }}
    >
      <article className={`${className} window`}>
        <div className="bar">
          <div>{title}</div>
          <div className="close" onClick={() => onClose()}>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 15 15"
              version="1.1"
              id="cross"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"
              />
            </svg>
          </div>
        </div>
        <div className="content">{data ? children : <>cargando...</>}</div>
      </article>
    </Draggable>
  );
};
