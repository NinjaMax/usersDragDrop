const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/index');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const DB_URL = process.env.DB_URL;
const APP_ROOT_URI = process.env.APP_ROOT_URI;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({origin: APP_ROOT_URI, credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Working'});
});
const start = async () => {
    try {
        await mongoose.connect(DB_URL ,{
            useNewUrlParser:true,
            useUnifiedTopology:true});
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }

};
start();