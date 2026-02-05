import { PrismicNextImage } from "@prismicio/next";
import React, { FC } from "react";
import { Bio } from "./sections/Bio";
import { Audiovisual } from "./sections/Audiovisual";
import { FloatingImage } from "./FloatingImage";
import { FloatingJpg } from "./FloatingJpg";
import { Folder } from "./Folder";
import { Moon } from "./Moon";
import { useSinglePrismicDocument } from "@prismicio/react";
import { Music } from "./sections/Music";
import { Oraculo } from "./sections/Oraculo";
import { Poesia } from "./sections/Poesia";
import { Visiones } from "./sections/Visiones";
import { NubeRosa } from "./sections/NubeRosa";
import { Prensa } from "./sections/Prensa";

enum BackgroundPosition {
  CENTER = "centrada",
  BORDERS = "ajustada a los bordes",
}

const BACKGROUND_POSITION_TO_CSS_POSITION_PROPERTY: Record<
  BackgroundPosition,
  string
> = {
  [BackgroundPosition.CENTER]: "center",
  [BackgroundPosition.BORDERS]: "center",
};

function mapBackgroundPositionToCSSPositionProperty(
  bp: BackgroundPosition
): string {
  return BACKGROUND_POSITION_TO_CSS_POSITION_PROPERTY[bp];
}

const BACKGROUND_POSITION_TO_CSS_SIZE_PROPERTY: Record<
  BackgroundPosition,
  string
> = {
  [BackgroundPosition.CENTER]: "auto",
  [BackgroundPosition.BORDERS]: "cover",
};

function mapBackgroundPositionToCSSSizeProperty(
  bp: BackgroundPosition
): string {
  return BACKGROUND_POSITION_TO_CSS_SIZE_PROPERTY[bp];
}

export const Desktop: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [background] = useSinglePrismicDocument("dektop");

  const backgroundImageUrl =
    background?.data.desktop[
      Math.floor(Math.random() * background?.data.desktop.length)
    ].image.url || "";

  const backgroundPosition = mapBackgroundPositionToCSSPositionProperty(
    background?.data.option as BackgroundPosition
  );

  const backgroundSize = mapBackgroundPositionToCSSSizeProperty(
    background?.data.option as BackgroundPosition
  );

  const backgroundColor = background?.data.color;

  return (
    <>
      <div
        className="desktop"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition,
          backgroundColor,
          backgroundSize,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="desktop-container">
          <Moon />
          {background?.data.imagenes_fotantes.map((flotante, index) => (
            <FloatingImage image={flotante} key={index} />
          ))}

          {background?.data?.imagenes_jpeg?.map((jpg, index) => (
            <FloatingJpg imagen={jpg} key={index} openWindow />
          ))}

          <Folder
            label={"música"}
            Component={Music}
            iconName="iconRosa"
            color="red"
          />
          <Folder
            label={"bio"}
            Component={Bio}
            iconName="iconRosa"
            color="red"
          />
          <Folder
            label={"audiovisual"}
            Component={Audiovisual}
            iconName="iconRosa"
            color="red"
          />
          <Folder
            label={"poesía"}
            Component={Poesia}
            iconName="iconRosa"
            color="red"
          />
          <Folder
            label={"visiones"}
            Component={Visiones}
            iconName="iconRosa"
            color="red"
          />
          <Folder
            label={"oráculo"}
            Component={Oraculo}
            iconName="iconRosa"
            color="red"
          />
          <Folder
            label={"nube rosa"}
            Component={NubeRosa}
            iconName="iconRosa"
            color="pink"
          />

          <Folder
            label={"prensa"}
            Component={Prensa}
            iconName="iconRosa"
            color="pink"
          />

          {children}
        </div>
      </div>
    </>
  );
};
