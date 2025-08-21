import React, { useEffect, useState } from "react";
import { resolveComputedStyles } from "../utils";
import { semanticTypography } from "../../tailwind.config.base";

export default {
  title: "Tokens/Typography",
};

const getTypeReadableName = (key: string): string => {
  if (key.startsWith("h")) return `Heading ${key.slice(1)}`;
  if (key.startsWith("b")) return `Body copy ${key.slice(1)}`;
  if (key.startsWith("s")) return `Small text ${key.slice(1)}`;
  return key;
};

const TypeSpecimen: React.FC<{
  name: string;
  fontSize: string;
  lineHeight: string;
}> = ({ name, fontSize, lineHeight }) => (
  <div className={`text-${name}`}>
    {getTypeReadableName(name)} ({fontSize}/{lineHeight})
  </div>
);

const FontSizes: React.FC = () => {
  const [resolvedTypography, setResolvedTypography] = useState<
    Record<string, { fontSize: string; lineHeight: string }>
  >({});

  useEffect(() => {
    const resolvedValues: Record<string, { fontSize: string; lineHeight: string }> = {};

    Object.keys(semanticTypography).forEach((key) => {
      const styles = resolveComputedStyles(`text-${key}`, ["font-size", "line-height"]);
      resolvedValues[key] = {
        fontSize: styles["font-size"].replace("px", ""),
        lineHeight: styles["line-height"].replace("px", ""),
      };
    });

    setResolvedTypography(resolvedValues);
  }, []);

  return (
    <div className="flex flex-col gap-0d50">
      {Object.entries(resolvedTypography).map(([key, { fontSize, lineHeight }]) => (
        <TypeSpecimen
          key={key}
          name={key}
          fontSize={fontSize}
          lineHeight={lineHeight}
        />
      ))}
    </div>
  );
};

export const Typography = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <FontSizes />
  </div>
);
