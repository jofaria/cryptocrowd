const router = require("express").Router();
const Event = require("./../models/event.model");

// require Users
const User = require(".././models/user.model");

router.get("/create-event", (req, res) => {
  res.render("event/create-event");
});

router.post("/create-event", (req, res) => {
  const newEvent = req.body;

  Event.create(newEvent).then((createdEvent) => {
    res.render("event/event-details", { event: createdEvent });
  });

  console.log(newEvent);
});

module.exports = router;
