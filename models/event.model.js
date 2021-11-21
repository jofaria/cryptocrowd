const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema({
  title: { type: String, required: true },
  coin: { type: String, required: true },
  date: Date,
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  img: {
    type: String,
    default:
      "https://www.american.edu/kogod/events/images/website_header_blue.png",
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;

/*
 {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
  */
