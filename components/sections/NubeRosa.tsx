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
        color={"pink"}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {nubeRosa?.data.nube_rosa.map((nube, index) => (
            <article
              key={index}
              style={{
                textAlign: "center",
                width: "18%",
                marginBottom: "20px",
                cursor: "pointer",
                padding: "20px",
              }}
              onClick={() => handleClickText(nube)}
            >
              <img src={`/iconFolder.png`} width="100%" />

              <div
                className="label"
                style={{ color: "black", fontSize: "13px" }}
              >
                {nube.title}
              </div>
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
                field={nube.texto}
              />
            </div>
          </div>
        </Window>
      ))}
    </>
  );
};
