require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

function zoneParameters () {

    console.log(`function running on ${PORT} 🚀`)
// establish output variables
// establish input (csv input variable, readstream file, etc)
// read row of csv
// store zone in zone variable
// create variable for csv output (using zone variable where appropriate)
// axios request to geocoding API for municipality boundary coordinates
// retrieve municipality boundary coordinates
// store coordinates in array using correct format (should match grow-a-pear backend data)
// push array to csv output (output stored in correct variable from before)

    console.log("function complete 🥳")
}

zoneParameters()