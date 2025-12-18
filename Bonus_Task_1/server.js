const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.get('/', (req, res) => {
    res.send("Hello user");
});

app.get('/json', (req, res) => {
    res.status(200).json({
        "text": "hi",
        "numbers": [1, 2, 3]
    })
});

app.get('/profile/:name', (req, res) => {
    const name = req.params.name
    res.send(`Profile page of ${name}`)
})

app.get('/letters', (req, res) => {
    const text = req.query.text;
    
    const shoutly = text.toUpperCase()
    const characterCount = text.length
    const charArray = text.split('')
    charArray.reverse()
    const backwards = charArray.join('')

    res.status(200).json({
        "normal": text,
        "shoutly": shoutly,
        "characterCount": characterCount,
        "backwards": backwards
    })
})

let users = [
    [1, "some"]
]

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    const id = req.body.id
    const name = req.body.name

    const user = [id, name]

    users.push(user)

    res.send("User created")
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name

    let user = users.find((element) => element[0] == id)

    user[1] = name

    res.send(user)
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id

    let user = users.find((element) => element[0] == id)

    user = null

    res.send("everything good")
})


app.listen(port, () => {
    console.log("Server running...");
});