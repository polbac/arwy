import { getRandomXYPositions } from "@/utils/browser";
import React, { FC, useEffect, useState } from "react";
import Draggable from "react-draggable";

export const Folder: FC<{
  label: string;
  Component: () => JSX.Element;
  color?: string;
  iconName?: string;
}> = ({ label, Component, color, iconName }) => {
  const [showComponent, setShowComponent] = useState(false);
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

          if (!dragging) {
            setShowComponent(true);
          }

          setDragging(false);
        }}
      >
        <article
          className="folder"
          style={{ textAlign: "center", width: "90px" }}
        >
          <img src={`/${iconName || "iconFolder"}.png`} width="50" />

          <div
            className="label"
            style={{
              color: "white",
              fontFamily: "helvetica",
              fontSize: "12px",
            }}
          >
            {label}
          </div>
        </article>
      </Draggable>
      {showComponent && (
        <Component
          x={currentFolderPosition.x}
          y={currentFolderPosition.y}
          onClose={() => setShowComponent(false)}
        />
      )}
    </>
  );
};
