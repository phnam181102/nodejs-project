const express = require("express");
const router = express.Router();
const passport = require("passport");
const csrf = require("csurf");
const userController = require("../app/controllers/UserController");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/logout", isLoggedIn, userController.logout);
router.use("/", notLoggedIn, function (req, res, next) {
    next();
});
router.get("/signup", userController.signup);
router.post(
    "/signup_post",
    passport.authenticate("local.signup", {
        successRedirect: "/",
        failureRedirect: "signup",
        failureFlash: true,
    })
);
router.get("/signin", userController.signin);
router.post(
    "/signin_post",
    passport.authenticate("local.signin", {
        successRedirect: "/",
        failureRedirect: "signin",
        failureFlash: true,
    })
);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}
