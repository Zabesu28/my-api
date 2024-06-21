/* @flow */
"use strict";

const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => res.send("Ce serveur marche c'est une dinguerie"));

app.use("/character", express.static(path.join(__dirname, "assets/"),{ immutable: true, maxAge: 3000 }));

app.use((err, req, res, next) => {
    console.error("Erreur :" + err.message)
    res.status(500).send("INTERNAL SERVER ERROR")

});

app.listen(3000, () => console.log("Dispo sur http://localhost:3000/!"));