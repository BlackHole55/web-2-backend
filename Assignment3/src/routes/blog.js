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

router.post("/", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        
        res.json(blog);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;