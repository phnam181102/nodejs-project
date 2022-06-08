const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const userRouter = require("./user");
const wishlistRouter = require("./wishlist");

function route(app) {
    app.use("/courses", coursesRouter);
    app.use("/me", meRouter);
    app.use("/user", userRouter);
    app.use("/wishlist", wishlistRouter)
    app.use("/", siteRouter);
}

module.exports = route;
