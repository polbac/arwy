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

export const Music: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [music] = useSinglePrismicDocument("music");
  const [list, setList] = useState([]);

  const handleClickText = (mus) => {
    setList((l) => {
      const newList = [...l];
      newList.push(mus);
      return newList;
    });
  };

  return (
    <>
      <Window
        onClose={onClose}
        title="musica"
        className={"music medium-window"}
        windowSize={WindowSize.MEDIUM}
        x={x}
        y={y}
        data={music}
        color={"#ccffcc"}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "450px",
            justifyContent: "space-evenly",
          }}
        >
          {music?.data.music.map((mus, index) => (
            <article
              key={index}
              className="musicfolder"
              style={{
                textAlign: "center",
                width: "29%",
                marginBottom: "20px",
                cursor: "pointer",
                padding: "20px",
              }}
              onClick={() => handleClickText(mus)}
            >
              <img src={`/iconFolder.png`} width="100%" />

              <div
                className="label"
                style={{
                  color: "black",
                  fontSize: "13px",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: "100px",
                  }}
                >
                  {mus.title[0].text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Window>

      {list.map((mus, index) => (
        <Window
          key={`t-${index}`}
          onClose={() =>
            setList((prevList) => prevList.filter((p) => p.title !== mus.title))
          }
          title={mus.title[0].text}
          className={"music-detail medium-window"}
          windowSize={WindowSize.MEDIUM}
          x={x + random(200)}
          y={y + random(200)}
          data={[]}
          color={"black"}
        >
          <div
            style={{ display: "flex", minWidth: "500px" }}
            className="minWidthContainer"
          >
            <div style={{ width: "50%" }}>
              <PrismicNextImage
                field={mus.image}
                style={{ height: "auto", width: "100%" }}
              />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <PrismicRichText field={mus.links} />
            </div>
          </div>
        </Window>
      ))}
    </>
  );
};
