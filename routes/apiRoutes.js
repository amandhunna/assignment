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
router.get("/users", (req, res) => {
    db.Users.findAll().then(users => res.send(users));
})

router.get("/user/:username/:password", (req, res) => {
    const { username, password } = req.params;
    db.Users.findAll({
        where: {
            [Op.and]: [{ username }, { password }]
        }
    }).then(users => res.send(users));
})

// test 
router.get("/tests", (req, res) => {
    let { itemname } = req.query;
    let query = {};
    if (itemname) {
        query = {
            where: {
                itemName: {
                    [Sequelize.Op.like]: `%${itemname}%`
                },
            }
        }
    }
    db.Tests.findAll(query).then(test => res.send(test));
});

// order

router.get("/orders", (req, res) => {
    db.Orders.findAll().then(order => res.send(order));
});

router.get("/order/:userId", async (req, res) => {
    const userId = req.params.userId;

    const order = await db.Orders.findAll({
        where: {
            [Op.and]: [{ paid: false }, { userId }]
        },
    });
    res.send(order);
});


router.put("/order", async (req, res) => {
    const { items, paid = false } = req.body;
    const { userId } = req.body;
    const dataToUpdate = {
        ...items ? { items } : {}, paid
    }

    try {
        const find = await db.Orders.findAll({
            where: {
                [Op.and]: [{ paid }, { userId }]
            },
        });
        const length = find.length;

        if (!length) {
            const order = await db.Orders.create({
                userId, paid, items
            });
            res.send(order);
        }

        const order = await db.Orders.update(dataToUpdate, {
            where: {
                [Op.and]: [{ userId }, { paid: false }]
            }
        });
        res.send(order);
    } catch (error) {
        res.send({ "status": 400, error: error.message });
    }

})


module.exports = router;
