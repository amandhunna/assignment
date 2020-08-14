const express = require("express");
const db = require("../models")
const seedUsers = require("../seed/seedUsers");
const seedTests = require("../seed/seedTests");
const Sequelize = require('sequelize');
const router = express.Router();

const { Op } = require("sequelize");

// seed 
router.post("/seed-users", async (req, res) => {
    try {
        const response = await db.Users.bulkCreate(seedUsers)
        res.send(response);
    } catch (err) {
        console.log("error in seeding users: ", err)
    }
})

router.post("/seed-tests", async (req, res) => {
    try {
        const response = await db.Tests.bulkCreate(seedTests)
        res.send(response);
    } catch (err) {
        console.log("error in seeding tests: ", err)
    }
})

// user 
router.post("/user", (req, res) => {
    db.Users.create({
        username: req.body.username,
        password: req.body.password,
    }).then(user => res.send(user));
})

router.get("/users", (req, res) => {
    db.Users.findAll().then(users => res.send(users));
})

router.get("/user/:username/:password", (req, res) => {
    db.Users.findAll({
        where: {
            username: req.params.username,
            password: req.params.password,
        }
    }).then(users => res.send(users));
})

router.put("/user", (req, res) => {
    db.Users.update({
        password: req.body.password,
    }, {
        where: {
            username: req.body.username
        }
    }).then(user => res.send(user));
})

router.delete("/user/:username", (req, res) => {
    db.Users.destroy({
        where: {
            username: req.params.username,
        }
    }).then(user => res.send(user));
})


// test 
router.post("/createtest", (req, res) => {
    db.Tests.create({
        category: req.body.category,
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        minPrice: req.body.minPrice,
        popular: req.body.popular,
        type: req.body.type,
        objectID: req.body.objectID,
    }).then(user => res.send(user));
})

router.get("/test/:itemname", (req, res) => {
    db.Tests.findAll({
        where: {
            itemName: {
                [Sequelize.Op.like]: `%${req.params.itemname}%`
            },
        }
    }).then(test => res.send(test));
})

// order
router.post("/order", async (req, res) => {
    const order = await db.Orders.create({
        userId: req.body.userId,
        paid: req.body.paid,
        items: req.body.item,
    });
    res.send(order);
});


router.get("/orders", (req, res) => {
    db.Orders.findAll().then(order => res.send(order));
})

router.get("/order/:orderId/:userId", (req, res) => {
    const id = req.params.orderId;
    const userId = req.params.userId;

    db.Orders.findAll({
        where: {
            [Op.and]: [{ id }, { userId }]
        },
    }).then(order => res.send(order));
})


router.put("/order", async (req, res) => {
    const items = req.body.items;
    const paid = req.body.paid;
    const id = req.body.orderId;

    const order = await db.Orders.update({
        items, paid,
    }, {
        where: {
            id
        }
    });
    res.send(order);
})


module.exports = router;
