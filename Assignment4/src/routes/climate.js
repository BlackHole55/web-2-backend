const express = require("express");
const Climate = require("../models/Climate")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { start_date, end_date } = req.query;

        const data = await Climate.find({
            date: {
                $gte: new Date(start_date),
                $lte: new Date(end_date)
            }
        }).sort({ date: 1 });

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

