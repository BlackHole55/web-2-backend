const express = require("express");
const path = require("path");
const blogRoutes = require("./routes/blog");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/client/index.html"));
});

module.exports = app;