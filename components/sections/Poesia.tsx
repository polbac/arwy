import { FC, useState } from "react";
import { Window, WindowSize } from "../Window";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { random } from "@/utils/random";

export const Poesia: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [texts] = useAllPrismicDocumentsByType("text");
  const [list, setList] = useState([]);

  const handleClickText = (text) => {
    setList((l) => {
      const newList = [...l];
      newList.push(text);
      return newList;
    });
  };

  return (
    <>
      <Window
        onClose={onClose}
        title="Poesía"
        className={"bio medium-window"}
        windowSize={WindowSize.MEDIUM}
        x={x}
        y={y}
        data={[]}
        color={"#3edd77"}
      >
        {texts?.map((text, index) => (
          <article key={`ti-${index}`}>
            <h6
              className="link articleTitle"
              onClick={() => handleClickText(text)}
            >
              {text.data.title}
            </h6>
          </article>
        ))}
      </Window>

      {list.map((text, index) => (
        <Window
          key={`t-${index}`}
          onClose={() =>
            setList((prevList) => prevList.filter((p) => p.id !== text.id))
          }
          title={text.data.title}
          className={"poesia medium-window"}
          windowSize={WindowSize.MEDIUM}
          x={x + random(200)}
          y={y + random(200)}
          data={[]}
          color={"pink"}
        >
          <div
            className="glow"
            dangerouslySetInnerHTML={{
              __html: text.data.body[0].text
                .replaceAll(" ", "&ensp;")
                .replaceAll(`\n`, "<br/>"),
            }}
          ></div>
        </Window>
      ))}
    </>
  );
};
