export const totalCalculator = (
  numbersCollection: object[],
  propertyName: string
) => {
  const total = numbersCollection
    ?.map((singleItem: any) => singleItem[propertyName])
    ?.reduce((total: number, num: number) => +total + +num, 0);
  return +total;
};
