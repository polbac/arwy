import { FC } from "react";
import { Window, WindowSize } from "../Window";
import {
  PrismicLink,
  PrismicRichText,
  useAllPrismicDocumentsByType,
  useSinglePrismicDocument,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export const Music: FC<{ x: number; y: number; onClose: () => void }> = ({
  x,
  y,
  onClose,
}) => {
  const [music] = useSinglePrismicDocument("music");

  return (
    <Window
      onClose={onClose}
      title="Música"
      className={"music medium-window"}
      windowSize={WindowSize.MEDIUM}
      x={x}
      y={y}
      data={music}
    >
      {music?.data.music.map((music) => (
        <div>
          <PrismicRichText field={music.title} />
          <PrismicNextImage field={music.image} />
          <PrismicLink field={music.link}>Link</PrismicLink>
        </div>
      ))}
      {/* <PrismicRichText field={bio?.data.title} />
      <PrismicRichText field={bio?.data.body} />
      <PrismicNextImage field={bio?.data.image} /> */}
    </Window>
  );
};
