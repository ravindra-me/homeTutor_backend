import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var Schema = mongoose.Schema;

const teacherProfile = new Schema(
  {
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    state: { type: String, required: true },
    educationForTeacher: {
      highSchool: { schoolName: { type: String }, passingYear: { type: Date } },
      higherSecondarySchool: {
        schoolName: { type: String },
        passingYear: { type: Date },
      },
      bachelorDegree: {
        schoolName: { type: String },
        passingYear: { type: Date },
      },
      masterDegree: {
        schoolName: { type: String },
        passingYear: { type: Date },
      },
      yearOfExperience: { type: Number },
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    studentIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TeacherProfile", teacherProfile);
