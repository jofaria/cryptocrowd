const router = require("express").Router();

//Auth Routes GO HERE!

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
