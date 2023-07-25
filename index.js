require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;


const csvFilePath = "./inputs/sample_input.csv";
// real file path: hardiness_zone_input_data

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

    if (data[0] === "municipality") {
        return
    }

    console.log(data[0], data[1], output)

    if (zone === "") {
        fs.appendFile("./outputs/input-errors.csv", `\n${data.toString()}`, "utf8", function(err){
            if (err) {
                console.log(err)
            }
        })

        return
    }

    // axios request to geocoding API for municipality boundary coordinates (request is for "geometry")
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data[0]}&${data[1]}$canada&key=${API_KEY}`)
        .then (response => {

            // retrieve municipality boundary coordinates
            const geocoding = response.data.results[0].geometry.bounds

            const southEastParam = [response.data.results[0].geometry.bounds.northeast.lng, response.data.results[0].geometry.bounds.southwest.lat];
            const southWestParam = [response.data.results[0].geometry.bounds.southwest.lng, response.data.results[0].geometry.bounds.southwest.lat];
            const northEastParam = [response.data.results[0].geometry.bounds.northeast.lng, response.data.results[0].geometry.bounds.northeast.lat];
            const northWestParam = [response.data.results[0].geometry.bounds.southwest.lng, response.data.results[0].geometry.bounds.northeast.lat];

            console.log("SW", southWestParam, "SE", southEastParam, "NE", northEastParam, "NW", northWestParam)

            // store coordinates in array using correct format (should match grow-a-pear backend data)
            const param = [southWestParam, southEastParam, northEastParam, northWestParam]

            console.log(param)
        })
        .catch (error => {
            console.error("Error:", error.message)
        })

    
    
    

  });

reader.on("close", () => {
    //  Reached the end of file
    console.log("function complete 🥳")
  });

}

zoneParameters()