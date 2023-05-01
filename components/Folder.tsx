import { getRandomXYPositions } from "@/utils/browser";
import React, { FC, useEffect, useState } from "react";
import Draggable from "react-draggable";

export const Folder: FC<{ label: string; Component: () => JSX.Element }> = ({
  label,
  Component,
}) => {
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
          <svg
            fill="#0000FF"
            width="50px"
            height="50px"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
            id="memory-folder"
          >
            <path d="M2 3H9V4H10V5H20V6H21V18H20V19H2V18H1V4H2V3M3 7V17H19V7H3Z" />
          </svg>

          <div className="label">{label}</div>
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
