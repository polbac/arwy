import { FC, useEffect, useState } from "react";
import { Window, WindowSize } from "../Window";
import { useSinglePrismicDocument } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Marquee from "react-fast-marquee";

let timer;

export const Oraculo: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [isStop, setIsStop] = useState(false);
  const [oraculo] = useSinglePrismicDocument("oraculo");
  const [showIndex, setShowIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    if (oraculo?.data.cartas.length) {
      setMaxIndex(oraculo?.data.cartas.length);
      console.log(oraculo?.data.cartas);
    }
  }, [oraculo]);

  useEffect(() => {
    if (maxIndex === 0) {
      return;
    }

    timer = setInterval(() => {
      if (maxIndex > 0 && !isStop) {
        setShowIndex((index) => (index === maxIndex - 1 ? 0 : index + 1));
      }
    }, 100);
    return () => (timer ? clearInterval(timer) : undefined);
  }, [maxIndex, isStop]);

  const stop = (e) => {
    if (isStop) {
      setIsStop(false);
      return;
    }

    setIsStop(true);

    e.preventDefault();

    return false;
  };

  return (
    <Window
      onClose={onClose}
      title="Oraculo"
      className={"bio medium-window"}
      windowSize={WindowSize.MEDIUM}
      x={x}
      y={y}
      data={oraculo}
      color={"black"}
    >
      {oraculo?.data.cartas.map(
        (card, index) =>
          index === showIndex && (
            <div
              style={{
                width: "220px",
                textAlign: "center",
              }}
              key={`image-${index}`}
            >
              <PrismicNextImage alt="" field={card.carta} width={800} />
            </div>
          )
      )}
      <div>
        <button
          onClick={stop}
          style={{
            pointerEvents: "default",
            cursor: "pointer",
            fontFamily: "Philosopher",
            padding: "6px",
            marginTop: "10px",
            color: "white",
            width: "220px",

            background: isStop
              ? "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
              : "linear-gradient(19deg, rgba(0,36,17,1) 0%, rgba(9,121,30,1) 35%, rgba(7,255,0,1) 100%)",
          }}
        >
          <Marquee>
            {isStop ? "COMENZAR ORACULO NUEVAMENTE" : "OBTENER UNA CARTA"}
          </Marquee>
        </button>
      </div>
    </Window>
  );
};
