const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");
const Event = require("./../models/event.model");

/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }
  Event.find().then((allEvents) => {
    console.log(allEvents);
    res.render("index", { userIsLoggedIn: userIsLoggedIn, event: allEvents });
  });
});

// GET /secret
// We use the isLoggedIn middleware to protect the route

router.get("/create-event", isLoggedIn, (req, res, next) => {
  res.render("event/create-event");
});

module.exports = router;
