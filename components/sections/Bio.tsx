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
    >
      <PrismicRichText field={bio?.data.title} />
      <PrismicRichText field={bio?.data.body} />
      <PrismicNextImage field={bio?.data.image} />
    </Window>
  );
};
