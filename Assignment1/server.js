const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.post('/calculate-bmi', (req, res) => {
    let weight = parseFloat(req.body.weight)
    let height = parseFloat(req.body.height)

    // Validate
    if (!height || !weight) {
        return res.status(400).json({ error: "Height and weight are required." });
    }
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: "Height and weight must be numbers." });
    }
    if (height < 50 || height > 300) {
        return res.status(400).json({ error: "Height must be between 50 and 250 cm." });
    }
    if (weight < 10 || weight > 500) {
        return res.status(400).json({ error: "Weight must be between 10 and 500 kg." });
    }

    // Calculate BMI
    let heightMFloat = height / 100
    
    let bmi = weight / (heightMFloat ** 2)


    let bmiResult = 'Normal weight'
    let bmiColor = '#66cc33'

    if (bmi < 18.5) {
        bmiResult = 'Underweight'
        bmiColor = '#02a5ff'
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiResult = 'Normal weight'
        bmiColor = '#66cc33'
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiResult = 'Overweight'
        bmiColor = '#ffcc00'
    } else {
        bmiResult = 'Obesity'
        bmiColor = '#ff3300'
    }

    res.status(200).json({
        bmi: bmi.toFixed(2),
        bmiResult: bmiResult,
        bmiColor: bmiColor
    }) 
});

app.listen(port, () => {
    console.log("Server running...");
});