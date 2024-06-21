/* @flow */
"use strict";

const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("Chargement...", "Heure : " + new Date().getHours() + ":" + new Date().getMinutes(), req.method, req.path);
    next();
});

app.use((req, res, next) => {
    if(req.method !== "DELETE"){
        res.send("Ce serveur est tellement goatesque")
    }else{
        next(new Error("Si tu delete jte delete"));
    }
});

app.use((err, req, res, next) => {
    console.error("Erreur :" + err.message)
    res.status(500).send("INTERNAL SERVER ERROR")

});

app.listen(3000, () => console.log("Dispo sur http://localhost:3000/!"));