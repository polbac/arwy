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
        title="(♥‿♥) ٩͡๏̯͡๏۶ツ【★】 ͗m u s i c a۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗W͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗E͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗I͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗R͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗D͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗G͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗E͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗N͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗E͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗R͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗A͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗T͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗O͔͔۪͔͔͔͔͗͗͗͗۫͗͗۰͔͔͗͗۰͔͔۪͔͔͔͔͗͗͗͗۫͗͗R͔͔۪͔͔͔͗͗͗͗۫͗۰͔͗ 【★】ツ ٩͡๏̯͡๏۶(♥‿♥)"
        className={"music medium-window"}
        windowSize={WindowSize.MEDIUM}
        x={x}
        y={y}
        data={music}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {music?.data.music.map((mus) => (
            <article
              style={{
                textAlign: "center",
                width: "25%",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleClickText(mus)}
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

              <div className="label">
                <PrismicRichText field={mus.title} />
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
          title={<PrismicRichText field={mus.title} />}
          className={"music-detail medium-window"}
          windowSize={WindowSize.MEDIUM}
          x={x + random(200)}
          y={y + random(200)}
          data={[]}
        >
          <div style={{ display: "flex", minWidth: "500px" }}>
            <div style={{ width: "50%" }}>
              <PrismicNextImage
                field={mus.image}
                style={{ height: "auto", width: "100%" }}
              />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <PrismicRichText field={mus.title} />
              <PrismicRichText field={mus.link} />
            </div>
          </div>
        </Window>
      ))}
    </>
  );
};
