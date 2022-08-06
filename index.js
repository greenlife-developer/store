require('dotenv').config({
    path: './config_files/.env'
})
const express = require("express");
const app = express(); 

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const mongoClient = mongodb.MongoClient;

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());

const mainURL = "http://localhost:5000/";
let database = null;

let http = require("http").createServer(app);

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());

const expressSession = require("express-session");
app.use(
    expressSession({
        key: "user_id",
        secret: "User secret object ID",
        resave: true,
        saveUninitialized: true,
    })
);

const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");
const { request } = require("http");
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10000mb",
        parameterLimit: 1000000,
    })
);

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

const db = require("./config_files/keys").mongoURI;
// const db = "mongodb://localhost:27017";

const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
    console.log("Server has started...");

    mongoClient.connect(
        db,
        { useUnifiedTopology: true },
        function (error, client) {
            if (error) {
                console.log(error);
                return;
            }
            database = client.db("eyob");

            app.get("/api", (req, res) => {
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

            app.get("/api/register", (req, res) => {
                res.json({
                    query: req.query,
                });
            });

            app.post("/api/register", (req, res) => {
                database.collection("users").findOne(
                    {
                        email: req.body.email,
                    },
                    (err, user) => {
                        if (user === null) {
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

            app.get("/api/login", (req, res) => {
                console.log(req.query)
                res.json({ 
                    query: req.query,
                });
            });

            app.post("/api/login", (req, res) => {
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

            app.post("/api/new-product", (req, res) => {
                const productName = req.body.productName
                const price = req.body.price
                const quantity = req.body.quantity

                total = price*quantity

                if (req.session.user_id){
                    getUser(req.session.user_id, (user) => {
                        if(user.numer === "08065109764"){
                            database.collection("storeItems").insertOne(
                                {
                                    productName: productName,
                                    price: price,
                                    quantity: quantity,
                                    total: total
                                },
                                (err, data) => {
                                    res.redirect("/api/dashboard?message=new-product");
                                }
                            );
                        } else{
                            res.send("<h1>Only the owner of the store can add products</h1>")
                        }
                    });
                } else {
                    res.send("<h1>Only logged in users can perform this action</h1>")
                }
            });

            app.get("/api/dashboard", (req, res) => {
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

            app.get("/api/logout", (req, res) => {
                req.session.destroy();
                res.redirect("/");
            });

        }
    );
});
