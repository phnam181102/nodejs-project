const express = require("express");
const router = express.Router();

const wishlistController = require("../app/controllers/WishlistController");

router.get("/add/:id", wishlistController.add);
router.get("/show", wishlistController.show);

module.exports = router;
