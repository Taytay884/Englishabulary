const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("./english-vocabulary.pdf");

pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log(data.numpages);
  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  const array = data.text.split("Unit");
  array.splice(0, 1);
  const arrayLength = array.length;
  const separators = new Array(10).fill("Nothing").map((value, index) => {
    return "\n" + (index + 1) + "\n";
  });
  const separatorsIndices = separators.map((separator) => {
    return array.findIndex((value) => value === separator);
  });
  const unitsMap = {};
  separatorsIndices.forEach((unitIndex, index) => {
    const unit = index + 1;
    let nextIndex = unit === 10 ? arrayLength : separatorsIndices[unit];
    unitsMap[unit] = array.splice(0, nextIndex - unitIndex);
  });
  Object.keys(unitsMap).forEach((unitNumber) => {
    unitsMap[unitNumber] = unitsMap[unitNumber].map((data) => data.split("\n"));
  });
  console.log(data.text);
});
