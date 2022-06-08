const User = require("../models/User");

class UserController {
    // [GET] /user/signup
    signup(req, res, next) {
        var messages = req.flash("error");
        res.render("user/signup", {
            csrfToken: req.csrfToken(),
            messages: messages,
            hasErrors: messages.length > 0,
        });
    }


    // [GET] /user/signin
    signin(req, res, next) {
        var messages = req.flash("error");
        res.render("user/signin", {
            csrfToken: req.csrfToken(),
            messages: messages,
            hasErrors: messages.length > 0,
        });
    }

    //[GET] /user/logout
    logout(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
    }
}

module.exports = new UserController();
