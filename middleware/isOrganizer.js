const Event = require("./../models/event.model");

function isOrganizer(req, res, next) {
  if (req.session.user._id === Event.organizer) {
    next();
  }
}

module.exports = isOrganizer;
