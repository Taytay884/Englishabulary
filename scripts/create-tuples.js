const wordsJson = require("./wordsAfterManualFixes.json");

const unitWordsAndDefinition = {};

Object.keys(wordsJson).forEach((unitNumber) => {
  unitWordsAndDefinition[unitNumber] = {};
  const unitWords = wordsJson[unitNumber];
  for (
    let i = 0, j = 1;
    i < unitWords.length && j < unitWords.length;
    i += 2, j += 2
  ) {
    unitWordsAndDefinition[unitNumber][unitWords[i]] = unitWords[j];
  }
});
console.log(wordsJson);
