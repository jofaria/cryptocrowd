const router = require("express").Router();

//Routes

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
