import { FC, createContext, useCallback, useState } from "react";

export const DestkopBrowser = createContext<{ getNextZIndex: () => number }>({
  getNextZIndex: () => 0,
});

export const DesktopContextProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [maxZIndex, setMaxZIndex] = useState(0);
  const getNextZIndex = useCallback(() => {
    setMaxZIndex((zIndex) => zIndex + 1);
    return maxZIndex;
  }, [maxZIndex]);
  return (
    <DestkopBrowser.Provider value={{ getNextZIndex }}>
      {children}
    </DestkopBrowser.Provider>
  );
};
