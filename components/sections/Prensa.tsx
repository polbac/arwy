import { FC } from "react";
import { Window, WindowSize } from "../Window";
import { useSinglePrismicDocument } from "@prismicio/react";

export const Prensa: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [prensa] = useSinglePrismicDocument("prensa");

  console.log({ prensa })

  return (
    <Window
      onClose={onClose}
      title="prensa"
      className={"audiovisual medium-window"}
      windowSize={WindowSize.MEDIUM}
      x={x}
      y={y}
      data={prensa}
      color={
        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
      }
      subtitle={
        <div className="footerBrowser">
          <div className="browser"></div>
        </div>
      }
    >
      <ul style={{ margin: "1rem", lineHeight: "30px" }}>
        {prensa?.data.prensa.map((item, index) => (
          <li key={index}>
            <a
              href={item.link.url}
              target="_blank"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              {item.texto}
            </a>
          </li>
        ))}
      </ul>
    </Window>
  );
};
