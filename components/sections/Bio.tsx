import { FC } from "react";
import { Window, WindowSize } from "../Window";
import { PrismicRichText, useSinglePrismicDocument } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export const Bio: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [bio] = useSinglePrismicDocument("bio");
  return (
    <Window
      onClose={onClose}
      title="Bio"
      className={"bio medium-window"}
      windowSize={WindowSize.MEDIUM}
      x={x}
      y={y}
      data={bio}
      color={"#f900ff"}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          lineHeight: "2rem",
          fontFamily: "arial",
          color: "white",
          textShadow: "0 0 8px blue",
        }}
      >
        <PrismicRichText field={bio?.data.body} />
      </div>

      <PrismicNextImage field={bio?.data.image} />

      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          lineHeight: "2rem",
          fontFamily: "arial",
          color: "white",
          textShadow: "0 0 8px blue",
        }}
      >
        <PrismicRichText field={bio?.data.body2} />
      </div>
      <div style={{ textAlign: "center" }}>
        <a
          download
          target="_blank"
          href={bio?.data.cv_file.url}
          style={{
            display: "inline-block",
            padding: "10px",
          }}
        >
          <p
            style={{ color: "black", fontSize: "60px", margin: 0, padding: 0 }}
          >
            💎
          </p>
          <span style={{ color: "black" }}>download cv</span>
        </a>
      </div>
    </Window>
  );
};
