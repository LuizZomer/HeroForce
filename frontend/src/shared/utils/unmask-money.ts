export const unmaskMoney = (value: string): number => {
  const onlyNumbersAndComma = value.replace(/[^\d,]/g, "");

  const normalized = onlyNumbersAndComma.replace(",", ".");

  const number = parseFloat(normalized);

  return isNaN(number) ? 0 : number;
};
