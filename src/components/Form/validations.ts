// Validations
export const required = (v: string | number): string | undefined => {
  if (!v) return "This field is required";

  return undefined;
};

export const acceptOnlyNumber = (v: number): string | undefined => {
  if (isNaN(v)) return "Value should be a valid number";

  return undefined;
};

export const numberRange = (v: number): string | undefined => {
  if (v && v > 500) return "Value cant be more than 500";
  if (v && v < 0) return "Value cant be less than 0";

  return undefined;
};

export const maxFileSize = (v: File): string | undefined => {
  const isLt10M = v.size / 1024 / 1024 < 10;
  if (!isLt10M) return "File should be smaller than 10MB";

  return undefined;
};
