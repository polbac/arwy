import { FC, useEffect, useState } from "react";
import { Window, WindowSize } from "../Window";
import { PrismicRichText, useSinglePrismicDocument } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export const Oraculo: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [oraculo] = useSinglePrismicDocument("oraculo");
  const [showIndex, setShowIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    setMaxIndex(oraculo?.data.cartas.length);
  }, [oraculo]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (maxIndex > 0) {
        setShowIndex((index) => (index === maxIndex - 1 ? 0 : index + 1));
      }
    }, 100);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <Window
      onClose={onClose}
      title="Oraculo"
      className={"bio medium-window"}
      windowSize={WindowSize.MEDIUM}
      x={x}
      y={y}
      data={oraculo}
    >
      {oraculo?.data.cartas.map(
        (card, index) =>
          index === showIndex && (
            <div style={{ minWidth: "320px", textAlign: "center" }}>
              <PrismicNextImage field={card.carta} height={300} />
            </div>
          )
      )}
    </Window>
  );
};
