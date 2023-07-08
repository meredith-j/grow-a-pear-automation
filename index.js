require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;


const csvFilePath = "./inputs/test_input.csv";

function zoneParameters () {
    console.log(`function running on ${PORT} 🚀`)


// establish input (csv input variable, readstream file, etc)
    const stream = fs.createReadStream(csvFilePath);
    const reader = readline.createInterface({ input: stream });

// read row of csv
reader.on("line", row => {

    let data = [];
        data.push(row.split(","));
        console.log(data)

    // establish output variables
    // store zone in zone variable
    // create variable for csv output (using zone variable where appropriate)
    // axios request to geocoding API for municipality boundary coordinates
    // retrieve municipality boundary coordinates
    // store coordinates in array using correct format (should match grow-a-pear backend data)
    // push array to csv output (output stored in correct variable from before)

  });

reader.on("close", () => {
    //  Reached the end of file
    console.log("function complete 🥳")
  });

}

zoneParameters()