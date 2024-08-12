import { Moon as MoonPhase, Hemisphere } from "lunarphase-js";
import { useState } from "react";

export const Moon = () => {
  const [position] = useState([Math.random() * 100, Math.random() * 100]);
  return (
    <div
      style={{
        position: "absolute",
        fontSize: "70px",
        top: `${position[0]}%`,
        left: `${position[0]}%`,
      }}
    >
      {MoonPhase.lunarPhaseEmoji(new Date(), {
        hemisphere: Hemisphere.SOUTHERN,
      })}
    </div>
  );
};
