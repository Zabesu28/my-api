/* @flow */
"use strict";

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:false }));

app.use("*", (req, res) => {
    console.log(req.query, req.body);
    res.send("Oui le server va bien blablabla")
});

app.use((err, req, res, next) => {
    console.error("Erreur :" + err.message)
    res.status(500).send("INTERNAL SERVER ERROR")

});

app.listen(3000, () => console.log("Dispo sur http://localhost:3000/!"));