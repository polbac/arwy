import { PrismicNextImage } from "@prismicio/next";
import React, { FC } from "react";
import { Bio } from "./sections/Bio";
import { Audiovisual } from "./sections/Audiovisual";
import { Folder } from "./Folder";
import {
  usePrismicDocumentByUID,
  useSinglePrismicDocument,
} from "@prismicio/react";
import { Music } from "./sections/Music";
import { Oraculo } from "./sections/Oraculo";
import { Poesia } from "./sections/Poesia";
import { Visiones } from "./sections/Visiones";
import { NubeRosa } from "./sections/NubeRosa";

export const Desktop: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [background] = useSinglePrismicDocument("dektop");

  const backgroundImageUrl =
    background?.data.desktop[
      Math.floor(Math.random() * background?.data.desktop.length)
    ].image.url || "";

  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Folder label={"música"} Component={Music} />
      <Folder label={"bio"} Component={Bio} />
      <Folder label={"audiovisual"} Component={Audiovisual} />
      <Folder label={"poesía"} Component={Poesia} />
      <Folder label={"visiones"} Component={Visiones} />
      <Folder label={"oráculo"} Component={Oraculo} />
      <Folder label={"nube rosa"} Component={NubeRosa} />

      {children}
    </div>
  );
};
