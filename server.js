// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 8680;

// Setup Data Parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// Require Routes File
require("./routes/routes")(app);

// Setup Listener
app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
})