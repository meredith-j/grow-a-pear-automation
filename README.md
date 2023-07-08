# grow-a-pear-automation

This is to automate the process of getting plant zone coordinates for Grow-A-Pear. Initial data was provided by Environment Canada, and it will be converted into the correct data type & format through this code.

# how to run grow-a-pear-automation
- install dependencies (npm i)
- get google api key and create .env folder (needed to retrieve geocoding data)
- add a csv file to the input folder. This file should be called "hardiness-zone-input-data.csv" in order for the function to work properly (local file has been added to .gitignore to keep data private).
- csv file should have rows of input for function to run through (see sample input in input folder)
- create empty output files for each zone
    - file names should follow this naming convention: zone__.csv
    - zones follow the pattern 0a, 0b, 1a, 1b, etc - all the way up to 9a
run server (npm run dev)

# about grow-a-pear

Grow-a-Pear was originally my final project at bootcamp. I was extremely proud of the work I did but needed to step away from it once school finished. Now that I have more experience coding and have had significant interest from my peers & network in this project, I am thinking of the original iteration of Grow-a-Pear as a product MVP and re-vamping it. My hope is to build an updated version with additional features that people can use to get comfortable gardening!

You can see the MVP for Grow-a-Pear here:
Front-end: https://github.com/meredith-j/meredith-jonatan-grow-a-pear-frontend
Back-end: https://github.com/meredith-j/meredith-jonatan-grow-a-pear-backend