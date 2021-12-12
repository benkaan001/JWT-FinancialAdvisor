
const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

// DB connection
const connectDB = require('./db/connect');
const isAuthenticated = require('./middleware/authentication')

// routers
const userRoutes = require('./routes/user');
const prospectsRoutes = require('./routes/prospects')




app.use(express.json());
app.use(express.urlencoded({extended: false }));



// routes
app.use('/api/v1/user', userRoutes )
app.use('/api/v1/prospects', isAuthenticated, prospectsRoutes)

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`🌍----> Server is listening on port ${port}----->🌍`);
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

start();