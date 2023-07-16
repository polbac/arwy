import { FC, useState } from "react";
import { Window, WindowSize } from "../Window";
import {
  PrismicLink,
  PrismicRichText,
  useAllPrismicDocumentsByType,
  useSinglePrismicDocument,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { random } from "@/utils/random";

export const NubeRosa: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [nubeRosa] = useSinglePrismicDocument("nube_rosa");
  const [list, setList] = useState([]);

  const handleClickText = (nube) => {
    setList((l) => {
      const newList = [...l];
      newList.push(nube);
      return newList;
    });
  };

  return (
    <>
      <Window
        onClose={onClose}
        title="nube rosa"
        className={"visiones medium-window"}
        windowSize={WindowSize.MEDIUM}
        x={x}
        y={y}
        data={nubeRosa}
        color={"linear-gradient(to right, #5433ff, #20bdff, #a5fecb)"}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {nubeRosa?.data.nube_rosa.map((nube, index) => (
            <article
              key={index}
              style={{
                textAlign: "center",
                width: "25%",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleClickText(nube)}
            >
              <svg
                fill="#ffffff"
                width="50px"
                height="50px"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
                id="memory-folder"
              >
                <path d="M2 3H9V4H10V5H20V6H21V18H20V19H2V18H1V4H2V3M3 7V17H19V7H3Z" />
              </svg>

              <div className="label">{nube.title}</div>
            </article>
          ))}
        </div>
      </Window>

      {list.map((nube, index) => (
        <Window
          key={`t-${index}`}
          onClose={() =>
            setList((prevList) =>
              prevList.filter((p) => p.titulo !== nube.titulo)
            )
          }
          title={nube.titulo}
          className={"music-detail medium-window"}
          windowSize={WindowSize.MEDIUM}
          x={x + random(200)}
          y={y + random(200)}
          data={[]}
          color={"black"}
        >
          <div style={{ display: "flex", minWidth: "500px" }}>
            <div style={{ width: "50%" }}>
              <PrismicNextImage
                field={nube.imagen}
                style={{ height: "auto", width: "100%" }}
              />
            </div>

            <div style={{ paddingLeft: "15px" }} className="label">
              <div className="articleTitle">{nube.title}</div>
              <PrismicRichText
                style={{ paddingLeft: "15px" }}
                field={nube.text}
              />
            </div>
          </div>
        </Window>
      ))}
    </>
  );
};
