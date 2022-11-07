const express = require("express");
const bodyParser = require("body-parser");
const toysDummyData = require("./toys-data.json");

const PORT = 3036;

const app = express();
app.use(bodyParser.json());

let toys = toysDummyData;

// GET '/toys?location=<location>' - Returns a list of all toys.
// ▪ Structure:
//  [
//    {
//      "name": “string”,
//      "brand": “string”,
//      "age-group": “string”,
//      "prize": number
//    },
// ]
app.get("/toys", (req, res) => {
  let location = req.query.location;

  let responseToys = JSON.parse(JSON.stringify(toys));

  responseToys.forEach((toy) => {
    if (location == "IE") {
      // IRELAND, USD to Euro, 23% Tax
      toy.prize = (toy.prize * 1.01 * 1.23).toFixed(2);
    } else if (location == "IN") {
      // INDIA, USD to INR, 18% Tax
      toy.prize = (toy.prize * 82.14 * 1.18).toFixed(2);
    } else {
      // Defaults to US, 8% Tax
      toy.prize = (toy.prize * 1 * 1.08).toFixed(2);
    }
  });

  res.status(200).json({
    error: false,
    message: "Data fetched successfully",
    count: responseToys.length,
    data: responseToys,
  });
});

// GET '/toys/team' - Returns a JSON object with team and member names.
// ▪ Structure:
//    {
//      “team”: “string”,
//      “membersNames”: [”string”]
//    }
app.get("/toys/team", (req, res) => {
  res.status(200).json({
    error: false,
    message: "Data fetched successfully",
    data: {
      team: "Backend 6 - Toys",
      membersNames: ["Shaan Subbaiah B C", "Keshini P S"],
    },
  });
});

// POST '/toys' - Add a new toy to the dataset.
// ▪ Structure:
//  {
//      "name": “string”,
//      "brand": “string”,
//      "age-group": “string”,
//      "prize": number
//  }
app.post("/toys", (req, res) => {
  let newToy = req.body;
  toys.push(newToy);
  res.status(201).json({
    error: false,
    message: "Toy added successfully",
    data: newToy,
  });
});

app.get("/toys/*", (req, res) => {
  res.status(404).json({
    error: true,
    message: "Route Not Found",
  });
});

app.listen(PORT, () => {
  console.log("Toys REST server is running on port " + PORT);
});
