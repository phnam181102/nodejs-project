const Course = require("../models/Course");
const Wishlist = require("../models/Wishlist");

class WishlistController {
    // [GET] /wishlist/add/:id
    add(req, res, next) {
        var courseId = req.params.id;
        var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});

        Course.findById(courseId, function (err, course) {
            if (err) {
                return res.redirect("/");
            }
            wishlist.add(course, course.id);
            req.session.wishlist = wishlist;
            res.redirect("/wishlist/show");
        });
    }

    // [GET] /wishlist/show
    show(req, res, next) {
        if(!req.session.wishlist) {
            return res.render('wishlist/show', {courses : null})
        }
        var wishlist = new Wishlist(req.session.wishlist)
        res.render('wishlist/show', {courses: wishlist.generateArray()})
    }
}

module.exports = new WishlistController();
