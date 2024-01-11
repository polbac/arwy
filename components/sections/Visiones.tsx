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
  const [showZoom, setShowZoom] = useState(false);

  const handleClickText = (vision) => {
    setList((l) => {
      const newList = [...l];
      newList.push(vision);
      return newList;
    });
  };
  console.log("showZoom", showZoom);
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
        <div style={{ display: "flex", flexWrap: "wrap", minWidth: "400px" }}>
          {visiones?.data.visiones.map((vision, index) => (
            <article
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
          className={"music-detail medium-window"}
          windowSize={WindowSize.MEDIUM}
          x={x + random(200)}
          y={y + random(200)}
          data={[]}
          color={"black"}
        >
          {!showZoom && (
            <div
              onClick={() => setShowZoom((sz) => !sz)}
              style={{
                display: "flex",
                width: "500px",
                minHeight: "500px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <PrismicNextImage
                field={vision.imagen}
                style={{ height: "auto", width: "100%", cursor: "zoom-in" }}
              />
            </div>
          )}

          {showZoom && (
            <div
              onClick={() => setShowZoom((sz) => !sz)}
              style={{
                display: "flex",
                width: "500px",
                minHeight: "500px",
                position: "relative",
                overflow: "scroll",
              }}
            >
              <div
                style={{
                  width: "250%",
                  height: "250%",
                  position: "absolute",
                  cursor: "zoom-out",
                }}
              >
                <PrismicNextImage
                  field={vision.imagen}
                  style={{ height: "auto", width: "100%" }}
                />
              </div>
            </div>
          )}
        </Window>
      ))}
    </>
  );
};
