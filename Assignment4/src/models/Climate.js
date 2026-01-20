const mongoose = require("mongoose");

const climateSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        meantemp: { type: Number, required: true },
        humidity: { type: Number, required: true },
        windSpeed: { type: Number, required: true },
        meanpressure: { type: Number, required: true }
    }
);

module.exports = mongoose.model("Climate", climateSchema);