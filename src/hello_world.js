/* @flow */
"use strict";

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Ce serveur marche c'est une dinguerie"));

app.listen(3000, () => console.log("Dispo sur http://localhost:3000/!"));