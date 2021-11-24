const Event = require("./../models/event.model");

async function isOrganizer(req, res, next) {
  const eventOrg = await Event.find({ organizer: req.session.user._id });
  if (req.session.user._id === Event.organizer) {
    next();
  } else {
    console.log("You are not the organizer");
  }
}

module.exports = isOrganizer;
