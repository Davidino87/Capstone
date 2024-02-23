export const dateConverter = (date) => {
  if (!date) {
    return date;
  }
  const slitDate = date.split("-");
  const year = slitDate[0];
  const month = slitDate[1];
  const day = slitDate[2];
  return `${day}/${month}/${year}`;
};
