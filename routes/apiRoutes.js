const express = require("express");
const db = require("../models")

const router = express.Router();

router.post("/createuser", (req, res) => {
    db.Users.create({
        username: req.body.username,
        password: req.body.password,
    }).then(user => res.send(user));
})

router.get("/allusers", (req, res) => {
    db.Users.findAll().then(users => res.send(users));
})

router.get("/finduser/:id", (req, res) => {
    db.Users.findAll({
        where: {
            id: req.params.id,
        }
    }).then(users => res.send(users));
})

router.put("/updateuser", (req, res) => {
    db.Users.update({
        password: req.body.password,
    }, {
        where: {
            username: req.body.username
        }
    }).then(user => res.send(user));
})




router.delete("/deleteuser/:id", (req, res) => {
    db.Users.destroy({
        where: {
            id: req.params.id,
        }
    }).then(user => res.send("success: " + user));
})





module.exports = router;
