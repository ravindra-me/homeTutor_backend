import mongoose from "mongoose";
var Schema = mongoose.Schema;

const token = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
});

export default mongoose.model("Token", token);
