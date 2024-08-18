import { getRandomXYPositions } from "@/utils/browser";
import { Moon as MoonPhase, Hemisphere } from "lunarphase-js";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";

export const Moon = () => {
  const { x: startX, y: startY } = getRandomXYPositions();
  const [position, setPosition] = useState<Array<number>>([]);
  useEffect(() => {
    setPosition([startX, startY]);
  }, [startX, startY]);

  if (!position[0]) {
    return null;
  }

  return (
    <Draggable
      defaultPosition={{
        x: position[0],
        y: position[1],
      }}
    >
      <div
        style={{
          fontSize: "70px",

          filter: "grayscale(1)",
        }}
      >
        <div style={{ position: "absolute" }}>
          {MoonPhase.lunarPhaseEmoji(new Date(), {
            hemisphere: Hemisphere.SOUTHERN,
          })}
        </div>
      </div>
    </Draggable>
  );
};
