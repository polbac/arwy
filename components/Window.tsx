import { DestkopBrowser } from "@/context/desktopContext";

import { getRandomXYPositions, getWindowPosition } from "@/utils/browser";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";

const getMobileDetect = (userAgent: NavigatorID["userAgent"]) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));

  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());

  return {
    isMobile,
  };
};

const useMobileDetect = () => {
  useEffect(() => {}, []);
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
  return getMobileDetect(userAgent);
};

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
  resizeable?: boolean;
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
  resizeable,
}) => {
  const {
    getNextZIndex,
    mousePosition,
    addMouseUpListHandler,
    removeMouseUpListHandler,
  } = useContext(DestkopBrowser);
  const ref = useRef();
  const refSize = useRef();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    zIndex: 0,
  });
  const [dynamicWindowSize, setDynamicWindowSize] = useState<
    { width?: number; height?: number } | undefined
  >();
  const [shouldDrag, setShouldDrag] = useState(true);
  const [resizeDirection, setResizeDirection] = useState<
    "left" | "right" | "bottom"
  >();
  const [resizeStartPosition, setResizeStartPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [shouldResize, setShouldeResize] = useState<boolean>(false);
  const [libPosition, setLibPosition] = useState<{ x: number; y: number }>({
    y: 0,
    y: 0,
  });

  const { isMobile } = useMobileDetect();

  useEffect(
    () =>
      setPosition({
        ...getWindowPosition(x, y, windowSize),
        zIndex: getNextZIndex() + 1,
      }),
    []
  );

  useEffect(() => {
    const identifier = new Date().getTime().toString();

    const onMouseUp = () => {
      setShouldDrag(true);
      setShouldeResize(false);
    };

    addMouseUpListHandler(onMouseUp, identifier);

    return () => removeMouseUpListHandler(identifier);
  }, []);

  useEffect(() => {
    if (shouldResize) {
      let width = 0;
      let height = 0;
      let x = 0;

      if (resizeDirection === "right") {
        const diffWidth = mousePosition.x - resizeStartPosition.x;
        width = resizeStartSize.width + diffWidth;

        setDynamicWindowSize({ width });
      }

      if (resizeDirection === "bottom") {
        const diffHeight = mousePosition.y - resizeStartPosition.y;
        height = resizeStartSize.height + diffHeight;

        setDynamicWindowSize({ height });
      }

      if (resizeDirection === "left") {
        const diffWidth = mousePosition.x - resizeStartPosition.x;

        width = resizeStartSize.width - diffWidth;

        setPosition((p) => ({
          ...p,
          x: mousePosition.x,
        }));

        setDynamicWindowSize({ width });
      }
    }
  }, [mousePosition, shouldResize]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref?.current?.classList.add("in");
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  if (position.x === 0) {
    return null;
  }

  const handleMouseEnterResize =
    (direction: "left" | "right" | "bottom") => () => {
      setShouldDrag(false);
      setResizeDirection(direction);
    };

  const handleMouseDownResize =
    (direction: "left" | "right" | "bottom") =>
    (event: { pageX: number; pageY: number }) => {
      setShouldeResize(true);
      setShouldDrag(false);
      setResizeStartPosition({ x: event.pageX, y: event.pageY });
      setResizeStartSize({
        width: refSize.current?.offsetWidth,
        height: refSize.current?.offsetHeight,
      });
    };

  return (
    <Draggable
      onStart={() => {
        if (!shouldDrag) {
          return;
        }

        setPosition((p) => ({ ...p, zIndex: getNextZIndex() }));
      }}
      defaultPosition={{
        x: position.x,
        y: position.y,
      }}
      disabled={isMobile() || !shouldDrag}
      position={position}
      onDrag={(event, data) => {
        if (!shouldDrag) {
          return;
        }

        setPosition((p) => ({
          /* @ts-ignore */
          x: data.x,
          /* @ts-ignore */
          y: data.y,
          zIndex: getNextZIndex(),
        }));
      }}
    >
      <article
        className={`${className} window`}
        style={{
          zIndex: position.zIndex,
          background: color,
          width: dynamicWindowSize ? `${dynamicWindowSize.width}px` : "auto",
          height: dynamicWindowSize ? `${dynamicWindowSize.height}px` : "auto",
        }}
        ref={refSize}
      >
        <div
          className="window-transition"
          ref={ref}
          style={{
            height: dynamicWindowSize
              ? `${dynamicWindowSize.height}px`
              : "auto",
          }}
        >
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
        {resizeable && (
          <>
            <div
              onMouseEnter={handleMouseEnterResize("left")}
              onMouseOut={() => {
                if (!shouldResize) {
                  setShouldDrag(true);
                }
              }}
              onMouseDown={handleMouseDownResize("left")}
              className="resizeable-left"
            ></div>
            <div
              onMouseEnter={handleMouseEnterResize("right")}
              onMouseDown={handleMouseDownResize("right")}
              onMouseOut={() => {
                if (!shouldResize) {
                  setShouldDrag(true);
                }
              }}
              className="resizeable-right"
            ></div>
            <div
              onMouseEnter={handleMouseEnterResize("bottom")}
              onMouseDown={handleMouseDownResize("bottom")}
              onMouseOut={() => {
                if (!shouldResize) {
                  setShouldDrag(true);
                }
              }}
              className="resizeable-bottom"
            ></div>
          </>
        )}
      </article>
    </Draggable>
  );
};
