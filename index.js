const express = require("express");
const app = new express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
var bodyParser = require('body-parser')

// middleware
const {testValidate} = require("./middleware/test")
// Import Router
const authRouter = require("./routes/auth");

// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())

// Database Connection
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>
        console.log(
            "==============Mongodb Database Connected Successfully=============="
        )
    )
    .catch((err) => console.log("Database Not Connected !!!", err));

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(4000, (req, res) => {
    console.log("app app listens")
})
