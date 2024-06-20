export const getImageUrl = (base64Image: string): string => {
  if (!base64Image) return "";

  if (base64Image.startsWith("/9j/")) {
    return `data:image/jpeg;base64,${base64Image}`;
  } else if (base64Image.startsWith("iVBORw0KGgo=")) {
    return `data:image/png;base64,${base64Image}`;
  } else if (base64Image.startsWith("data:image/")) {
    return base64Image;
  } else {
    return `data:image/jpeg;base64,${base64Image}`;
  }
};
