import { FC } from "react";
import { Window, WindowSize } from "../Window";
import { PrismicRichText, useSinglePrismicDocument } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export const Audiovisual: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [audiovisual] = useSinglePrismicDocument("audiovisual");

  return (
    <Window
      onClose={onClose}
      title="Audiovisual"
      className={"audiovisual medium-window"}
      windowSize={WindowSize.MEDIUM}
      x={x}
      y={y}
      data={audiovisual}
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
        {audiovisual?.data.audiovisual.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              target="_blank"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              {item.titulo}
            </a>
          </li>
        ))}
      </ul>
    </Window>
  );
};
