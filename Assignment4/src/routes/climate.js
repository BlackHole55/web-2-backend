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

router.get("/metrics", async (req, res) => {
    try {
        const { start_date, end_date, field } = req.query;

        const metrics = await Climate.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(start_date),
                        $lte: new Date(end_date)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    average: { $avg: `$${field}` },
                    min: { $min: `$${field}` },
                    max: { $max: `$${field}` },
                    stdDev: { $stdDevPop: `$${field}` },
                    count: { $sum: 1 }
                }
            }
        ]);

        if (metrics.length == 0) {
            return res.status(404).json({ message: "No data found for this range" });
        }

        res.json(metrics[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;