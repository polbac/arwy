import { FC, useEffect, useState } from "react";
import { Window, WindowSize } from "../Window";
import { useSinglePrismicDocument } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Marquee from "react-fast-marquee";

export const Oraculo: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [isStop, setIsStop] = useState(false);
  const [oraculo] = useSinglePrismicDocument("oraculo");
  const [showIndex, setShowIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [barajar, setBarajar] = useState(true);

  useEffect(() => {
    if (oraculo?.data.cartas.length) {
      setMaxIndex(oraculo?.data.cartas.length);
    }
  }, [oraculo]);

  const stop = (e) => {
    setBarajar((s) => {
      setShowIndex(Math.floor(Math.random() * maxIndex));
      return !s;
    });

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
      {barajar && (
        <div
          style={{
            width: "220px",
            height: "340px",
            textAlign: "center",
          }}
          key={`barajar`}
          className="barajar"
        >
          <img src="/carta.jpeg" width="100%" className="carta-1" />
          <img src="/carta.jpeg" width="100%" className="carta-2" />
        </div>
      )}

      {!barajar && oraculo && (
        <div
          style={{
            width: "220px",
            height: "340px",
            textAlign: "center",
          }}
          key={`image-0`}
        >
          <PrismicNextImage
            alt=""
            field={oraculo?.data?.cartas[showIndex].carta}
            width={800}
          />
        </div>
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

            background: !barajar
              ? "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
              : "linear-gradient(19deg, rgba(0,36,17,1) 0%, rgba(9,121,30,1) 35%, rgba(7,255,0,1) 100%)",
          }}
        >
          <Marquee>
            {!barajar ? "COMENZAR ORACULO NUEVAMENTE" : "OBTENER UNA CARTA"}
          </Marquee>
        </button>
      </div>
    </Window>
  );
};
