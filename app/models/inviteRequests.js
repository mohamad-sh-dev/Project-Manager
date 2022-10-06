const mongoose = require("mongoose");

const inviteRequestSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "نام میزبان الزامی است"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "نام کا ربرالزامی است"],
  },
  requestDate: {
    type: Date,
    default: Date.now(),
  },
  teamID: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
    required: [true, "شناسه تیم مورد نیاز است"],
  },
  status: {
    type: String,
    enum: ["pending", "accept", "reject"],
    required: [true, "وضعیت مورد نیاز است"],
  },
});

const InviteRequestModel = new mongoose.model(
  "InviteRequest",
  inviteRequestSchema
);
module.exports = {
  InviteRequestModel,
};
