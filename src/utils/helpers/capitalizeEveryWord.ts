export const capitalizeEveryWord = (sentence: string) => {
  // SPLIT THE SENTENCE INTO WORDS
  const words = sentence.split(" ");

  // CAPITALIZE THE FIRST LETTER OF EACH WORD
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // JOIN THE CAPITALIZED WORDS BACK INTO A SENTENCE
  return capitalizedWords.join(" ");
};
