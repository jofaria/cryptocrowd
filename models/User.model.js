const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  saved: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  attending: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  eventCreated: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  profileImg: { type: String, default: "" },
});

const User = model("User", userSchema);

module.exports = User;
