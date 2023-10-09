import { DestkopBrowser } from "@/context/desktopContext";
import Marquee from "react-fast-marquee";
import { getRandomXYPositions, getWindowPosition } from "@/utils/browser";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const TITLE_CHAR_MAPPER = {
  w: "W̸̢̫̺͆̒́",
  e: "E̸̼͍̫͐̓̔",
  r: "R̵͎̦͓̒̿̚",
  t: "T̵͉͍̼̐̓̓",
  y: "Y̵̢͎̫͝͠",
  u: "U̸͕̦͖͛͘͝",
  i: "I̴̡̟̝͐̀",
  o: "O̴̪͙̫͐̿̕",
  p: "P̸͍̟͇̓̚̚",
  a: "A̵̝̠̟͛̀̽",
  s: "S̸͙͔͚̿̐͆",
  d: "D̸͖͚̝͆̓͋",
  f: "F̴͇̻͎̈́͆̈́",
  g: "G̴̘͓̠̈́̒͐",
  h: "H̵͉͙̟͆͐͠",
  j: "J̴͍̘͍̽͊͘",
  k: "K̵̻̺͍͌̾͝",
  l: "L̴̝̼͖̈́̐͘",
  n: "Ñ̴̼̦̒̀͘",
  z: "Ź̴̦͙̟̓͘",
  x: "X̵̞̠̟͆͆͘",
  c: "C̴̙̟͛̔̿͜",
  b: "B̸̟̪͋͝",
  m: "M̴̢͎̒̓̚͜",
};

function asciiEffect(text: string): string {
  console.log({ text });
  return (text || "")
    .split("")
    .map((s) => TITLE_CHAR_MAPPER[s.toLocaleLowerCase()] ?? s)
    .join("");
}

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
  title: string | JSX.Element;
  className: string;
  x: number;
  y: number;
  onClose: () => void;
  windowSize: WindowSize;
  data: unknown;
  color: string;
  subtitle?: JSX.Element;
}> = ({
  children,
  title,
  className,
  x,
  y,
  onClose,
  windowSize,
  data,
  color,
  subtitle,
}) => {
  const { getNextZIndex } = useContext(DestkopBrowser);
  const ref = useRef();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    zIndex: 0,
  });

  useEffect(
    () =>
      setPosition({
        ...getWindowPosition(x, y, windowSize),
        zIndex: getNextZIndex(),
      }),
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref?.current?.classList.add("in");
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  if (position.x === 0) {
    return null;
  }

  return (
    <Draggable
      onStart={() => {
        setPosition((p) => ({ ...p, zIndex: getNextZIndex() }));
      }}
      defaultPosition={{
        x: position.x,
        y: position.y,
      }}
    >
      <article
        className={`${className} window`}
        style={{ zIndex: position.zIndex, background: color }}
      >
        <div className="window-transition" ref={ref}>
          <div
            className="bar"
            style={{
              background: "#9605ff",
              color,
            }}
          >
            <div style={{ flex: 1 }}>{asciiEffect(title)}</div>

            <div
              className="close"
              onClick={() => onClose()}
              style={{ fontSize: "24px", textShadow: "0 0 5px white" }}
            >
              ⚔️
            </div>
          </div>
          <div className="content" style={{ background: color }}>
            {data ? children : <>cargando...</>}
          </div>
        </div>
      </article>
    </Draggable>
  );
};
