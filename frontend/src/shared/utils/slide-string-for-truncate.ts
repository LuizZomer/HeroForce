export const slideStringForTruncate = (string: string, limit: number) => {
  return string.length > limit ? `${string.slice(0, limit)}...` : string;
};
