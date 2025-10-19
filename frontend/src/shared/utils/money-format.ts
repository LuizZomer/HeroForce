export const formatMoney = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");

  const number = Number(onlyNumbers) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
