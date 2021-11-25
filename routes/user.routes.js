const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");
const Event = require("./../models/event.model");
const User = require("./../models/user.model");

router.get("/profile", isLoggedIn, (req, res) => {
  const userId = req.session.user._id;

  User.findById(userId)
    .populate("attending")
    .populate("eventCreated")
    .then((foundUser) => {
      res.render("user/profile", { user: foundUser });
    });
});

module.exports = router;
