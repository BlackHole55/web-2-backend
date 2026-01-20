const express = require("express");
const path = require("path");
const climateRoutes = require("./routes/climate");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/climate", climateRoutes);

app.get("/", (req, res) => {
    res.send("App running");
    // res.sendFile(path.join(__dirname, "..", "/client/index.html"));
});

module.exports = app;