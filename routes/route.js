require("dotenv").config({
    path: "../config_files/.env",
});

const express = require("express")

const router = express.Router()

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const mongoClient = mongodb.MongoClient;

let database = null;
const bcrypt = require("bcrypt");

const db = process.env.MONGO_URI;
// const db = "mongodb://localhost:27017";

function getUser(userId, callBack) {
    database.collection("users").findOne(
        {
            _id: ObjectId(userId),
        },
        function (error, result) {
            if (error) {
                console.log(error);
                return;
            }
            if (callBack !== null) {
                callBack(result);
            }
        }
    );
}

mongoClient.connect(
    db,
    { useUnifiedTopology: true },
    function (error, client) {
        if (error) {
            console.log(error);
            return;
        }
        database = client.db("eyob");

        router.get("/", (req, res) => {
            database
                .collection("users")
                .find()
                .sort({
                    createdAt: -1,
                })
                .toArray((err, users) => {
                    if (req.session.user_id) {
                        getUser(req.session.user_id, function (user) {
                            res.json({
                                isLogin: true,
                                query: req.query,
                                user: user,
                                users: users,
                            });
                        });
                    } else {
                        res.json({
                            isLogin: false,
                            query: req.query,
                            users: users,
                        });
                    }
                });
        });

        router.get("/dashboard", (req, res) => {
            database
                .collection("storeItems")
                .find()
                .sort({
                    createdAt: -1,
                })
                .toArray((err, items) => {
                    if (req.session.user_id) {
                        getUser(req.session.user_id, function (user) {
                            res.json({
                                isLogin: true,
                                query: req.query,
                                user: user,
                                items: items,
                            });
                        });
                    } else {
                        res.json({
                            isLogin: false,
                            query: req.query,
                            items: items,
                        });
                    }
                });
        });

        router.get("/sales", (req, res) => {
            database
                .collection("salesItems")
                .find()
                .sort({
                    createdAt: -1,
                })
                .toArray((err, items) => {
                    if (req.session.user_id) {
                        getUser(req.session.user_id, function (user) {
                            res.json({
                                isLogin: true,
                                query: req.query,
                                user: user,
                                items: items,
                            });
                        });
                    } else {
                        res.json({
                            isLogin: false,
                            query: req.query,
                            items: items,
                        });
                    }
                });
        });

        router.get("/register", (req, res) => {
            res.json({
                query: req.query,
            });
        });

        router.post("/register", (req, res) => {
            database.collection("users").findOne(
                {
                    number: req.body.number,
                },
                (err, user) => {
                    if (user === null ) {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            database.collection("users").insertOne(
                                {
                                    firstName: req.body.fName,
                                    lastName: req.body.lName,
                                    email: req.body.email,
                                    number: req.body.number,
                                    password: hash,
                                },
                                (err, data) => {
                                    console.log(err);
                                    res.redirect("/api/dashboard?message=registered");
                                }
                            );
                        });
                    } else {
                        res.redirect("/api/register?error=exists");
                    }
                }
            );
        });

        router.get("/login", (req, res) => {
            console.log(req.query);
            res.json({
                query: req.query,
            });
        });

        router.post("/login", (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            database.collection("users").findOne(
                {
                    email: email,
                },
                (err, user) => {
                    if (user === null) {
                        res.redirect("/api/login?error=not_exists");
                    } else {
                        bcrypt.compare(
                            password,
                            user.password,
                            (err, isPasswordVerify) => {
                                if (isPasswordVerify) {
                                    req.session.user_id = user._id;
                                    res.redirect("/api/dashboard");
                                } else {
                                    res.redirect("/api/login?error=wrong_password");
                                }
                            }
                        );
                    }
                }
            );
        });

        router.post("/new-product", (req, res) => {
            const productName = req.body.productName;
            const price = req.body.price;
            const quantity = req.body.quantity;

            total = price * quantity;

            if (req.session.user_id) {
                getUser(req.session.user_id, (user) => {
                    if (user.number === "08065109764") {
                        database.collection("storeItems").insertOne(
                            {
                                productName: productName,
                                price: price,
                                quantity: quantity,
                                total: total,
                            },
                            (err, data) => {
                                res.redirect("/api/dashboard?message=new-product");
                            }
                        );
                    } else {
                        res.send("<h1>Only the owner of the store can add products</h1>");
                    }
                });
            } else {
                res.send("<h1>Only logged in users can perform this action</h1>");
            }
        });

        router.get("/edit/:id", async (req, res) => {
            const result = await database
                .collection("storeItems")
                .findOne({ _id: ObjectId(req.params.id) });
            res.json({
                product: result, 
            });
        });

        router.post("/edit/:id", async (req, res) => {
            const result = await database
                .collection("storeItems")
                .findOne({ _id: ObjectId(req.params.id) });

            if (req.session.user_id) {
                getUser(req.session.user_id, (user) => {
                    if (user.number === "08065109764" || user.number === "09065109764") {
                        const myquery = { quantity: result.quantity };
                        const newvalues = { $set: { quantity: req.body.quantity, total: result.price * req.body.quantity } };
                        database
                            .collection("storeItems")
                            .updateOne(myquery, newvalues, function (err, data) {
                                if (err) throw err;
                                res.redirect("/api/dashboard?success=new_update")
                            });
                    } else {
                        res.send("<h1>Only the owner of the store can add products</h1>");
                    }
                });
            } else {
                res.send("<h1>Only logged in users can perform this action</h1>");
            }
        });


        router.post("/new-sales/:id", async (req, res) => {
            const result = await database
                .collection("storeItems")
                .findOne({ _id: ObjectId(req.params.id) });

            if (req.session.user_id) {
                getUser(req.session.user_id, (user) => {
                    if (user.number === "08065109764" || user.number === "09065109764") {
                        const myquery = { quantity: result.quantity };
                        const total = req.body.price * req.body.quantity
                        const newQuantity = result.quantity - req.body.quantity
                        const newvalues = { $set: { quantity: newQuantity, total: result.price * newQuantity } };
                        database
                            .collection("storeItems")
                            .updateOne(myquery, newvalues, function (err, data) {
                                if (err) throw err;
                                database.collection("salesItems").insertOne(
                                    {
                                        productName: req.body.productName,
                                        price: req.body.price,
                                        quantity: req.body.quantity,
                                        total: total,
                                    }
                                );
                                res.redirect("/api/dashboard?success=new_update")
                            });
                    } else {
                        res.send("<h1>Only the owner of the store can add products</h1>");
                    }
                });
            } else {
                res.send("<h1>Only logged in users can perform this action</h1>");
            }
        });

        router.get("/logout", (req, res) => {
            req.session.destroy();
            res.redirect("/");
        });
    }
);

module.exports = router;