const router = require("express").Router();
const Event = require("./../models/event.model");

// require Users
const User = require(".././models/user.model");

router.get("/create-event", (req, res) => {
  res.render("event/create-event");
});

router.post("/create-event", (req, res) => {
  const newEvent = req.body;

  Event.create(newEvent)
    .then((createdEvent) => {
      res.render("index");
    })
    .catch((err) => console.log(err));

  console.log(newEvent);
});

router.get("/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  Event.findById(eventId)
    .then((foundEvent) => {
      res.render("event/event-details", { event: foundEvent });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
