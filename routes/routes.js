// Require Dependencies
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = app => {
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.post("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let notes = JSON.parse(response);
            let newNotes = req.body;
            newNotes.id = uuidv4();
            notes.push(newNotes);
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), (err) => {
                if (err) throw err;
                console.log("Added your new note: " + newNotes.title);
                res.send(201);
            });
        });
    });

    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let notes = JSON.parse(response);
            res.json(notes);
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let notes = JSON.parse(response);
            let nonDeletedNotes = notes.filter((note) => {
                return note.id !== req.params.id;
            });
            fs.writeFile("db/db.json", JSON.stringify(nonDeletedNotes, '\t'), (err) =>{
                if (err) throw err;
                console.log("Note Deleted"); 
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        });
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};