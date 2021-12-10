
const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const app = express();
require('dotenv').config();
require('express-async-errors');

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(errorHandlerMiddleware);


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