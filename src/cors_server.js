/* @flow */
"use strict";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: 'dummy, content-type'
}));

app.get("/", (req, res) =>{
    res.json({ message: 'Le cors dans mes veines'})
});

app.listen(port, () => console.log(`Dispo sur http://localhost:${port}/!`));