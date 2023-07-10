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
      color={
        "linear-gradient(19deg, rgba(2,0,36,1) 0%, rgba(70,9,121,1) 35%, rgba(255,0,239,1) 100%)"
      }
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          lineHeight: "2rem",
          fontFamily: "Maragsa",
        }}
      >
        <PrismicRichText field={bio?.data.body} />
      </div>
      <PrismicNextImage field={bio?.data.image} />
    </Window>
  );
};
