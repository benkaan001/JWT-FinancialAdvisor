
const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

// security npm packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const limiter = require('express-rate-limit');


// DB connection
const connectDB = require('./db/connect');
const isAuthenticated = require('./middleware/authentication')

// routers
const userRoutes = require('./routes/user');
const prospectsRoutes = require('./routes/prospects')


//refer to docs for limit values
app.set('trust proxy', 1);
app.use(limiter({
    windowMs: 15 * 60 * 1000,  // 15 mins
    max: 100,  // limit each IP to 100 requests per window
}));

app.use(express.json());


app.use(cors());
app.use(helmet());
app.use(xss());

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