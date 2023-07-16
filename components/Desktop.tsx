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
      <Folder
        label={"música"}
        Component={Music}
        color="#44db7a"
        iconName="iconMusic"
      />
      <Folder
        label={"bio"}
        Component={Bio}
        color="#f41e36"
        iconName="iconBio"
      />
      <Folder
        label={"audiovisual"}
        Component={Audiovisual}
        color="#4567d5"
        iconName="iconAudiovisual"
      />
      <Folder
        label={"poesía"}
        Component={Poesia}
        color="#0fff40"
        iconName="iconPoesia"
      />
      <Folder label={"visiones"} Component={Visiones} color="#f09deb" />
      <Folder
        label={"oráculo"}
        Component={Oraculo}
        color="#384178"
        iconName="iconOraculo"
      />
      <Folder
        label={"nube rosa"}
        Component={NubeRosa}
        color="#fb81ba"
        iconName="iconRosa"
      />

      {children}
    </div>
  );
};
