import React, { FC } from "react";
import { Folder } from "./Folder";

export const Desktop: FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Folder label={"music"} link={"/music"} />
    <Folder label={"bio"} link={"/music"} />
    {children}
  </>
);
