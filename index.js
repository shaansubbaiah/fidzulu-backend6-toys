const express = require("express");
const bodyParser = require("body-parser");
const toysDummyData = require("./toys-data.json");

const PORT = 3036;

const app = express();
app.use(bodyParser.json());

let toys = toysDummyData;

// '/toys?location=<location>' returning all the items
// ▪ <location> to accept US-NC (for North Carolina), IE (for Ireland),
//   or IN (for India), which results in a price calculation converting the
//   prices in the JSON files (which are in USD) into the appropriate
//   currency and applying sales tax, which is 8% for US-NC, 23% for
//   IE, and 18% for India.
// ▪ HTTP GET
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

// '/team' returns a JSON object with team name and all team member names
// ▪ HTTP GET
// ▪ Structure: {“team”: “string”, “membersNames”: [”string”]}
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

// '/toys' to add a new toy to the dataset.
// ▪ Body format:
//  {
//      "name": "Medical Kit",
//      "brand": "Fisher-Price",
//      "age-group": "3 to 9",
//      "prize": 1
//  }
// ▪ HTTP POST
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
