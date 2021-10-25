const express = require("express");
const app = express();
require('dotenv').config();
const Router = './routes/routes.js'
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const mongo = require('./Config/databaseConfig')
const dataCollector = require('./dataCollector')
const User = require('./Model/users')
const controller = require('./controllers/controller');
const functions = require('./public/js/function')
const { route } = require("./routes/routes");
app.use(bodyParser.urlencoded({
    extended: true
}));

// Setting up the app
app.use(express.static('public'))
app.use("/css", express.static(__dirname + 'public/css'))
app.use("/js", express.static(__dirname + 'public/js'))
app.use("/images", express.static(__dirname + 'public/images'))

// Setting the view engine
app.set("view engine", 'ejs');

//the  page
app.use('/', require(Router))
app.use("/sub", require(Router))
app.use('/getSong', require(Router))
app.use('/login', require(Router))
app.use('/search', require(Router))

//function

app.use('/getLogin', require(Router))



// })
// The local host server
app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
