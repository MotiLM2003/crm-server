export const formatMoney = (value) => {
  let result = parseInt(value)
    .toFixed(1)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  result = `${result.replace('.0', '')}€`;
  return result;
};
