const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3300;

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json({
    limit: "50mb"
}));

// Database connection
require('./config/db');

app.use(cors("*"));

app.use("/user", require("./routes/user-router"));
app.use("/patient", require("./routes/patient-router"));
app.use("/master", require("./routes/master-data-router"));


app.get("/", (req, res) => {
    res.send("kaveri Backend Running");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: true,
        message: "Internal Server Error",
        details: err,
    });
});

app.listen(port, () => {

    console.log(`App running on ${port}`);
});