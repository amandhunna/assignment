const express = require("express");
const db = require("../models")

const router = express.Router();

router.get("/allusers", (req, res) => {
    db.Users.findAll().then(users => res.send(users));
})

router.post("/createuser", (req, res) => {
    db.Users.create({
        username: req.body.username,
        password: req.body.password,
    }).then(user => res.send(user));
})


module.exports = router;
