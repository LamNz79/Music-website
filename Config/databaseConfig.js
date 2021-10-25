const mongoose = require('mongoose');
const express = require("express");
const app = express();
require('dotenv').config();
const url = process.env.url


mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(url, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
