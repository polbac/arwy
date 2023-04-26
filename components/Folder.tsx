import { FC } from "react";
import Draggable from "react-draggable";

export const Folder: FC<{ label: string; link: string }> = ({ label }) => {
  const browserWidth = typeof window !== "undefined" ? window?.innerWidth : 0;
  const browserHeight = typeof window !== "undefined" ? window?.innerHeight : 0;
  return (
    <Draggable
      defaultPosition={{
        x: -browserWidth / 2 + browserWidth * Math.random(),
        y: -browserHeight / 2 + browserHeight * Math.random(),
      }}
    >
      <article className="folder">
        <div>
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
        </div>
        {label}
      </article>
    </Draggable>
  );
};
