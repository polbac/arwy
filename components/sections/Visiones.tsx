import { FC, useState } from "react";
import { Window, WindowSize } from "../Window";
import { useSinglePrismicDocument } from "@prismicio/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { PrismicNextImage } from "@prismicio/next";
import { random } from "@/utils/random";

export const Visiones: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [visiones] = useSinglePrismicDocument("vision");
  const [list, setList] = useState([]);

  const handleClickText = (vision) => {
    setList((l) => {
      const newList = [...l];
      newList.push(vision);
      return newList;
    });
  };

  return (
    <>
      <Window
        onClose={onClose}
        title="visiones"
        className={"visiones medium-window"}
        windowSize={WindowSize.MEDIUM}
        x={x}
        y={y}
        data={visiones}
        color={"rgb(208 124 152)"}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap", minWidth: "400px" }}
          className="minWidthContainer"
        >
          {visiones?.data.visiones.map((vision, index) => (
            <article
              className="visionesItem"
              key={index}
              style={{
                textAlign: "center",
                width: "25%",
                marginBottom: "20px",
                cursor: "pointer",
                margin: "1rem",
              }}
              onClick={() => handleClickText(vision)}
            >
              <PrismicNextImage
                field={vision.imagen}
                style={{ height: "100px", width: "auto" }}
              />

              <div className="label">{vision.titulo}</div>
            </article>
          ))}
        </div>
      </Window>

      {list.map((vision, index) => (
        <Window
          key={`t-${index}`}
          onClose={() =>
            setList((prevList) =>
              prevList.filter((p) => p.titulo !== vision.titulo)
            )
          }
          title={vision.titulo}
          className={"music-detail medium-window resizeable"}
          windowSize={WindowSize.MEDIUM}
          resizeable
          x={x + random(200)}
          y={-700}
          data={[]}
          color={"black"}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <PrismicNextImage
              field={vision.imagen}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
                maxHeight: "80vh",
              }}
            />
          </div>
        </Window>
      ))}
    </>
  );
};
