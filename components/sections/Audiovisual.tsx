import { FC } from "react";
import { Window, WindowSize } from "../Window";
import { useSinglePrismicDocument } from "@prismicio/react";
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
      className={"audiovisual large-window"}
      windowSize={WindowSize.LARGE}
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
      <div className="audiovisual-grid">
        {audiovisual?.data.audiovisual.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="audiovisual-item"
          >
            {item.imagen?.url ? (
              <PrismicNextImage field={item.imagen} />
            ) : (
              <div className="audiovisual-item-placeholder" />
            )}
            <div className="audiovisual-item-title">{item.titulo}</div>
          </a>
        ))}
      </div>
    </Window>
  );
};
