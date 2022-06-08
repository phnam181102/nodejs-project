const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    // [GET] /home
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render("home", {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
