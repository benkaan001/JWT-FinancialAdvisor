const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get('/', (req,res) => {
    res.send("Ready!..Let's go!!!")
})

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`🌍----> Server is listening on port ${port}----->🌍`);
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

start();