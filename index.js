require("dotenv").config({
  path: "./config_files/.env",
});
const express = require("express");
const path = require("path")
const app = express();

app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10000mb",
    parameterLimit: 1000000,
  })
);

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    key: "user_id",
    secret: "User secret object ID",
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/api', require("./routes/route"));
// --------------------------deployment------------------------------
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server has started on port " + PORT + " ...");
});
