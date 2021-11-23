const router = require("express").Router();
const Event = require("./../models/event.model");
const isLoggedIn = require("./../middleware/isLoggedIn");

// require Users
const User = require("./../models/user.model");

// require Cloudinary
const fileUploader = require("./../config/cloudinary.config");
const { populate } = require("../models/user.model");
const isOrganizer = require("./../middleware/isOrganizer");

router.get("/create-event", isLoggedIn, (req, res) => {
  res.render("event/create-event");
});

let user;

router.post("/create-event", fileUploader.single("eventHeader"), (req, res) => {
  // User.find(req.session.user);
  console.log("Luke, I am your User", req.session.user);

  const { title, coin, date, location, description, eventHeader } = req.body;

  if (!title || !coin || !date || !location || !description) {
    res.render("event/create-event", {
      errorMessage: "Fill all the mandatory fields",
    });
    return;
  }

  if (!eventHeader) {
    res.render("event/create-event", {
      errorMessage: "Provide a cover image",
    });
    return;
  }

  let createdEventDoc;
  Event.create({
    title,
    coin,
    date,
    location,
    description,
    organizer: req.session.user._id,
    eventHeader: req.file.path,
  })
    .then((createdEvent) => {
      createdEventDoc = createdEvent;

      return User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { eventCreated: createdEvent._id } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      const eventId = createdEventDoc._id;

      return Event.findById(eventId).populate("organizer");
    })
    .then((populatedEvent) => {
      res.render("event/event-details", { event: populatedEvent });
    })
    .catch((err) => console.log(err));
  //console.log(newEvent);
});

router.get("/events/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  Event.findById(eventId)
    .then((foundEvent) => {
      res.render("event/event-details", { event: foundEvent });
    })
    .catch((err) => console.log(err));
});

router.get("/events/edit/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  Event.findById(eventId)
    .then((foundEvent) => {
      res.render("event/edit-event", { event: foundEvent });
    })
    .catch((err) => console.log(err));
});

//router.get("/events/edit/:eventId", (req, res) => {
// res.render("event/edit-event");
// });

router.post(
  "/events/edit/:eventId",
  fileUploader.single("eventHeader"),
  (req, res) => {
    const eventId = req.params.eventId;
    const { title, coin, date, description, location } = req.body;
    console.log(eventId);

    if (!title || !coin || !date || !location || !description) {
      res.render("event/create-event", {
        errorMessage: "Fill all the mandatory fields",
      });
      return;
    }

    if (!eventHeader) {
      res.render("event/create-event", {
        errorMessage: "Provide a cover image",
      });
      return;
    }

    Event.findByIdAndUpdate(
      eventId,
      {
        title,
        coin,
        date,
        description,
        location,
        organizer: req.session.user._id,
        eventHeader: req.file.path,
      },
      { new: true }
    )
      .then((foundEvent) => {
        console.log("this is the found and updated even", foundEvent);
        res.render("event/event-details", { event: foundEvent });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;

//619ccd29ed614a4cece22c54
//619ccdc40c15c598ccbb2b4a
