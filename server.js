const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('../view/index')
})

app.get('/login', (req, res) => {
    res.render('../view/login')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})