require('dotenv').config()

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})

app.get('/randomuser', async (req, res) => {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    res.send(data)
})

app.get('/country', async (req, res) => {
    const country = req.query.country
    
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    const data = await response.json()
    res.send(data)
})

app.get('/currency', async (req, res) => {
    const currency = req.query.currency

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${currency}`)
    const data = await response.json()
    res.send(data)
})

app.get('/news', async (req, res) => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
    const data = await response.json()
    res.send(data)
})

app.listen(port, () => {
    console.log("Server running...");
});