import { getRandomXYPositions } from "@/utils/browser";
import { PrismicNextImage } from "@prismicio/next";
import React, { FC, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { WindowSize, Window } from "./Window";
import { random } from "@/utils/random";

export const FloatingJpg: FC<{
  imagen?: string;
  openWindow: boolean;
}> = ({ imagen, openWindow }) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const { x: startX, y: startY } = getRandomXYPositions();
  const [currentFolderPosition, setCurrentFolderPosition] = useState({
    x: 0,
    y: 0,
  });
  const [dragging, setDragging] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setPosition({ x: startX, y: startY });
    setCurrentFolderPosition({ x: startX, y: startY });
  }, []);

  if (position.x === 0) {
    return null;
  }

  return (
    <>
      <Draggable
        defaultPosition={{
          x: position.x,
          y: position.y,
        }}
        onDrag={() => {
          console.log("onDrag");
          setDragging(true);
        }}
        onStop={(e: { clientX: number; clientY: number }) => {
          console.log("aca", dragging);
          if (!dragging) {
            setShowWindow(true);
          }

          setCurrentFolderPosition({ x: e.clientX, y: e.clientY });
          setDragging(false);
        }}
      >
        <article style={{ position: "absolute", cursor: "move" }}>
          <img
            src={imagen.imagen.url}
            intrinsicsize="80x80"
            style={{
              pointerEvents: "none",
              maxWidth: "60px",
              objectFit: "cover",
            }}
          />
        </article>
      </Draggable>
      {showWindow && (
        <Window
          key={`t-${imagen.imagen.alt}`}
          onClose={() => setShowWindow(false)}
          title={imagen.imagen.alt}
          className={"music-detail medium-window resizeable"}
          windowSize={WindowSize.MEDIUM}
          resizeable
          x={startX + random(200)}
          y={startY + random(200)}
          data={[]}
          color={"black"}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <PrismicNextImage
              field={imagen.imagen}
              style={{
                objectFit: "contain",
                height: "auto",
                width: "100%",
                maxHeight: "80vh",
              }}
            />
          </div>
        </Window>
      )}
    </>
  );
};
