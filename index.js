const express = require('express')
const app = express()

const PORT = 5000;


app.get('/', (req, res) => {
    res.send('<h1 style="font-family: sans-serif; text-align: center; padding-top: 50px;">Hello Express</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT} port`);
});