"use strict";

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const validateUser = require("./validate_user.js");

const SECRET_JWT_KEY = "restFullAPICLOUDcampus";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/public", (req, res) => {
  res.send("The public /public endpoint needs no token !");
});

app.post("/getToken", (req, res) => {
  validateUser(req.body.user, req.body.password, (idErr, userid) => {
    if (idErr !== null) {
      res.status(401).send(idErr);
    } else {
      jwt.sign(
        { userid },
        SECRET_JWT_KEY,
        { algorithm: "HS256", expiresIn: "1h" },
        (err, token) => res.status(200).send(token)
      );
    }
  });
});

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("No token specified");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Token expired or not valid");
    } else {
      req.userid = decoded.userid;
      next();
    }
  });
});

app.get("/private", (req, res) => {
  res.send("The /private endpoint needs JWT, but it was provided: OK !");
});

app.use((err, req, res, next) => {
  console.error("Error... ", err.message);
  res.status(500).send("INTERNAL SERVER ERROR");
});

app.listen(3000, () =>
  console.log("Mini JWT server ready, at http://localhost:3000/")

);