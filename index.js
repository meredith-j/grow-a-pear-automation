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

    // store data in array
    let rawData = [];
        rawData.push(row.split(","));

    let data = rawData.flat()

    // store zone in zone variable
    let zone = data[2]

    // establish output variables (using zone variable where appropriate)
    let output = `./outputs/zone${zone}.csv`

    console.log(data[0], data[1], output)

    // axios request to geocoding API for municipality boundary coordinates
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data[0]}&key=${data[1]}`)
        .then (response => {
            const geocoding = response.data
            console.log(geocoding)
        })
        .catch (error => {
            console.error("Error:", error.message)
        })

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