import { PrismicNextImage } from "@prismicio/next";
import React, { FC } from "react";
import { Bio } from "./sections/bio";
import { Folder } from "./Folder";
import {
  usePrismicDocumentByUID,
  useSinglePrismicDocument,
} from "@prismicio/react";
import { Music } from "./sections/Music";
import { Oraculo } from "./sections/Oraculo";

export const Desktop: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [background] = useSinglePrismicDocument("dektop");

  const backgroundImageUrl = background?.data.background.url || "";

  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Folder label={"música"} Component={Music} />
      <Folder label={"bio"} Component={Bio} />
      <Folder label={"audiovisual"} Component={Bio} />
      <Folder label={"poesía"} Component={Bio} />
      <Folder label={"visiones"} Component={Bio} />
      <Folder label={"oráculo"} Component={Oraculo} />
      {children}
    </div>
  );
};