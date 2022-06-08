const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const validator = require("express-validator");
const MongoStore = require("connect-mongo")(session);
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

require("./config/passport.js");

app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(validator());
app.use(
    session({
        secret: "mysupersecret",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: { maxAge: 180 * 60 * 1000 },
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// HTTP loger
// app.use(morgan('combined'))

// Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
