export const totalCalculator = (
  numbersCollection: string[] | number[],
  propertyName: string
) => {
  const total = numbersCollection
    ?.map((singleItem: any) => singleItem[propertyName])
    ?.reduce((total: number, num: number) => +total + +num, 0);
  return +total;
};
