const http = require("https");
const fetch = require("node-fetch");
const app_id = "9f79ba30"; // insert your APP Id
const app_key = "5fb07602e374035155fe6efa2fb04b1a"; // insert your APP Key
const wordId = "ace";

const options = {
  host: "od-api.oxforddictionaries.com",
  port: "443",
  path: "/api/v2/sentences/en/" + wordId + "?strictMatch=false",
  method: "GET",
  headers: {
    app_id: app_id,
    app_key: app_key,
  },
};

function getDataFromOxfordApi(word) {
  // options.path = "/api/v2/sentences/en/" + word + "?strictMatch=false";
  // return new Promise((resolve, reject) => {
  //   http.get(options, (resp) => {
  //     let body = "";
  //     resp.on("data", (d) => {
  //       body += d;
  //     });
  //     resp.on("end", () => {
  //       let parsed = JSON.stringify(body);
  //
  //       resolve(parsed);
  //     });
  //   });
  // });
  const url = `https://od-api.oxforddictionaries.com/api/v2/sentences/en/${word}?strictMatch=false`;

  return fetch(url, {
    method: "GET",
    headers: {
      //HERE IS THE DIFFERENCE
      app_id: app_id,
      app_key: app_key,
    },
    mode: "no-cors",
  }).then(function (response) {
    console.log(response.body);
  });
}

getDataFromOxfordApi("abrupt").then((res) => {
  console.log(res);
});
