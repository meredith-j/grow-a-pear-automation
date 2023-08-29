require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;


const csvFilePath = "./inputs/hardiness_zone_input_data.csv";
// actual data in file: hardiness_zone_input_data.csv
// test data file: sample_input.csv
// bigger test data file: test_input.csv

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

    if (data[1] === "Province/Territory") {
        return
    }

    if (data[3] === "-999") {
        fs.appendFile("./outputs/input-no-zone.csv", `${data.toString()} zone empty,\n`, "utf8", function(err){
            if (err) {
                console.log(err, data)
            }
        })
        
        console.log(data[0], data[1], "error: no zone")
        return
    }
    
    if (zone === "") {
        fs.appendFile("./outputs/input-errors.csv", `${data.toString()} zone empty,\n`, "utf8", function(err){
            if (err) {
                console.log(err, data)
            }
        })

        console.log(data[0], data[1], "error: no zone")
        return
    }

    // axios request to geocoding API for municipality boundary coordinates (request is for "geometry")
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data[0]}&${data[1]}$canada&key=${API_KEY}`)
        .then (response => {

            // retrieve municipality boundary coordinates
            const southEastParam = [response.data.results[0].geometry.bounds.northeast.lng, response.data.results[0].geometry.bounds.southwest.lat];
            const southWestParam = [response.data.results[0].geometry.bounds.southwest.lng, response.data.results[0].geometry.bounds.southwest.lat];
            const northEastParam = [response.data.results[0].geometry.bounds.northeast.lng, response.data.results[0].geometry.bounds.northeast.lat];
            const northWestParam = [response.data.results[0].geometry.bounds.southwest.lng, response.data.results[0].geometry.bounds.northeast.lat];

            // store coordinates in array using correct format (should match grow-a-pear backend data)
            const param = [southWestParam, southEastParam, northEastParam, northWestParam]

            console.log(data[0], data[1], zone, "param", param)

            // push array to csv output (output stored in correct variable from before)
            fs.appendFile(output, `[[${param[0].toString()}], [${param[1].toString()}], [${param[2].toString()}], [${param[3].toString()}]],\n`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            fs.appendFile("./inputs/completed_input.csv", `\n${data.toString()}, DONE`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })
    
            // fs.appendLine(csvFilePath, data, "", "utf8", function(err) {
            //     if(err) {
            //         console.log(err)
            //     }
            // })
        })
        .catch (error => {

            // add to error output csv file
            fs.appendFile("./outputs/input-errors.csv", `${data.toString()} params undefined, \n`, "utf8", function(err){
                if (err) {
                    console.log(err)
                    console.log(data[0], data[1], zone, "error with google API")
                }
            })

            console.error("Error:", error.message)
        })

    
  });

reader.on("close", () => {
    //  Reached the end of file
    console.log("function complete 🥳")
  });

}

zoneParameters()