let express = require("express");
let passport = require("./config/passport");
var session = require("express-session");


require('dotenv').config();


let PORT = process.env.PORT || 8080;
let app = express();
let path = require("path")

app.use(express.static(path.join(__dirname, "happyplant/build")));
app.use(express.static("happyplant/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routers/routers.js')(app);

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});