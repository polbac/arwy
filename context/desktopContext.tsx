import { FC, createContext, useCallback, useEffect, useState } from "react";

export const DestkopBrowser = createContext<{
  getNextZIndex: () => number;
  mousePosition: { x: number; y: number };
  addMouseUpListHandler: (cb: () => void, identifier: string) => void;
  removeMouseUpListHandler: (identifier: string) => void;
}>({
  getNextZIndex: () => 0,
  mousePosition: { x: 0, y: 0 },
  addMouseUpListHandler: () => () => {
    return "";
  },
  removeMouseUpListHandler: () => {},
});

export const DesktopContextProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [maxZIndex, setMaxZIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseUpListHandler, setMouseUpListHandler] = useState<
    Record<string, () => void>
  >({});

  const getNextZIndex = useCallback(() => {
    setMaxZIndex((zIndex) => zIndex + 1);
    return maxZIndex;
  }, [maxZIndex]);

  useEffect(() => {
    const onMouseMove = (event: { pageX: number; pageY: number }) => {
      setMousePosition({ x: event.pageX, y: event.pageY });
    };
    const onMouseUp = () => {
      
      Object.keys(mouseUpListHandler).forEach((key) => {
        mouseUpListHandler[key]();
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseUpListHandler]);

  const addMouseUpListHandler = (cb: () => void, identifier: string) => {
    setMouseUpListHandler((last) => ({ ...last, [identifier]: cb }));
  };

  const removeMouseUpListHandler = (identifier: string) => {
    setMouseUpListHandler((last) => {
      delete last[identifier];
      return last;
    });
  };

  return (
    <DestkopBrowser.Provider
      value={{
        getNextZIndex,
        mousePosition,
        addMouseUpListHandler,
        removeMouseUpListHandler,
      }}
    >
      {children}
    </DestkopBrowser.Provider>
  );
};
