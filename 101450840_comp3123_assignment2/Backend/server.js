const express = require("express");
const mongoose = require("mongoose");
const userRouts = require("./routes/user.js");
const empRouts = require("./routes/employee.js");

const cors = require("cors");


const app = express();
const DB_CONNECTION_STRING = "mongodb://mongodb:27017/comp3123";  
app.use(cors());

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: ", err);
});

const SERVER_PORT = 8088;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/v1/user", userRouts);
app.use("/api/v1/emp", empRouts);

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB</h1>");
    });

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
