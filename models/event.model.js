const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema({
  title: { type: String, required: true },
  coin: { type: String, required: true },
  date: Date,
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  img: { String, default: "" },
});

const Event = model("Event", eventSchema);

module.exports = Event;

/*
 {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
  */
