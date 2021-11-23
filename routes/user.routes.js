const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");
const Event = require("./../models/event.model");
const User = require("./../models/user.model");

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("user/profile");
});

module.exports = router;
