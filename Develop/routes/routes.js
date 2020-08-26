const fs = require("fs");
const path = require("path");

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        app.get("public/notes", (req, res) => {
            res.json(notes);
        });

        app.get("*", (req,res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    });
};
