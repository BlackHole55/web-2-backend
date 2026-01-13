const express = require("express");
const blogRoutes = require("./routes/blog");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

module.exports = app