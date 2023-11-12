const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: {
    type: [],
    required: true,
  },
});

const room = mongoose.model("Room", RoomSchema);
module.exports = room;
