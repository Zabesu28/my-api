/* @flow */
"use strict";

const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());

const myRouter = require("./router_home.js");
app.use("/", myRouter);

app.use((err, req, res, next) => {
    console.error("Erreur :" + err.message)
    res.status(500).send("INTERNAL SERVER ERROR")
});

app.listen(3000, () => console.log("Dispo sur http://localhost:3000/!"));