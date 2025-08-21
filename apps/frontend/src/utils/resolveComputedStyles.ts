export const resolveComputedStyles = (className: string, properties: string[]): Record<string, string> => {
  const tempElement = document.createElement("div");
  tempElement.className = className;
  document.body.appendChild(tempElement);

  const computedStyle = getComputedStyle(tempElement);
  const resolvedStyles: Record<string, string> = {};

  properties.forEach((property) => {
    resolvedStyles[property] = computedStyle.getPropertyValue(property);
  });

  document.body.removeChild(tempElement);
  return resolvedStyles;
};
