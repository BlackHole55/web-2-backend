const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;