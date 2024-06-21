/* @flow */
"use strict";

const express = require("express");
const path = require("path");
const app = express();

const flagsPath = path.join(__dirname, "./assets/");
console.log(flagsPath);

app.get("/noah", (req, res) => res.sendFile(`${flagsPath}` + 'Noah_portrait.webp'));

app.get("/mio", (req, res) => res.sendFile(`${flagsPath}` + 'Mio_portrait.webp'));

app.get("/eunie", (req, res) => res.sendFile(`${flagsPath}` + 'Eunie_portrait.webp'));

app.use("/static", express.static(path.join(__dirname, "./assets"),{ immutable: true, maxAge: 3000 }));

app.use((err, req, res, next) => {
    console.error("Erreur :" + err.message)
    res.status(500).send("INTERNAL SERVER ERROR")
});

app.listen(3000, () => console.log("Dispo sur http://localhost:3000/!"));