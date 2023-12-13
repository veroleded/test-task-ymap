export default (min, max, number) => {
  if (!number) {
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }
  const itengers = [];
  for (let i = 1; i <= number; i++) {
    const rand = min + Math.random() * (max + 1 - min);
    itengers.push(Math.floor(rand));
  }
  return itengers;
};
