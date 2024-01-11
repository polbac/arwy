import { getRandomXYPositions } from "@/utils/browser";
import React, { FC, useEffect, useState } from "react";
import Draggable from "react-draggable";

export const FloatingJpg: FC<{
  imagen?: string;
}> = ({ imagen }) => {
  console.log({ imagen });
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
        onDrag={() => setDragging(true)}
        onStop={(e: { clientX: number; clientY: number }) => {
          setCurrentFolderPosition({ x: e.clientX, y: e.clientY });
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
    </>
  );
};
