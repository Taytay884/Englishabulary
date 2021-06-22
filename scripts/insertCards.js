const axios = require("axios");
const wordsAndDefs = require("./wordsAndDefinitions.json");

init();

async function init() {
  const token = await login();
  let unitNumbers = Object.keys(wordsAndDefs);
  unitNumbers = unitNumbers.map(Number);
  for (
    let unitNum = unitNumbers[0];
    unitNum <= unitNumbers[unitNumbers.length - 1];
    unitNum++
  ) {
    const unitWordsAndDefsMap = wordsAndDefs[unitNum];
    const words = Object.keys(unitWordsAndDefsMap);
    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      const definition = unitWordsAndDefsMap[word];
      await insertCard({ word, definition, unit: unitNum }, token);
    }
  }
}

async function login() {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", {
      email: "taytay884@yahoo.com",
      password: "123456",
    });
    return response.data.access_token;
  } catch (e) {
    console.log("login", e);
  }
}

async function insertCard(data, token) {
  const { word, definition, unit, hints } = data;
  try {
    const response = await axios.post(
      "http://localhost:4000/card",
      {
        word,
        definition,
        unit,
        hints: hints || [],
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (e) {
    console.log("insertCard", e);
  }
}
