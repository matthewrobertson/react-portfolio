const LOCALE = "en-US";

export const parseInteger = (val: string): number => {
  const res = parseInt(val, 10);
  return res ? res : 0;
};

export const formatCurrency = (val: number): string => {
  return val.toLocaleString(LOCALE, {
    currency: "USD",
    style: "currency",
  });
};

export const formatPercent = (val: number): string => {
  return val.toLocaleString(LOCALE, {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

export const updatedToday = (val: number | undefined | null): boolean => {
  if (val == null) {
    return false;
  }
  return Date.now() - val < 24 * 60 * 60;
};
