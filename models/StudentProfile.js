import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var Schema = mongoose.Schema;

const studentProfile = new Schema(
  {
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    state: { type: String, required: true },
    educationForStudent: {
      className: { type: String },
      schoolName: { type: String },
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    fatherNumber: { type: Number, length: 10 },
    teacherIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentProfile", studentProfile);
