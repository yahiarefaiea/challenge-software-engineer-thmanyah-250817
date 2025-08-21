import React from "react";
import classNames from "classnames";
import type { DividerProps } from "./types";
import "./Divider.scss";

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
  ...props
}) => {
  const dividerClasses = classNames(
    "divider",
    `divider--${orientation}`,
    className,
  );

  return (
    <div className={dividerClasses} {...props} />
  );
};
