import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var Schema = mongoose.Schema;

const user = new Schema(
  {
    email: { type: String, match: /@/, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String, min: 8, max: 15, required: true, minlength: 8 },
    image: { type: String },
    phone: { type: Number, required: true },
    isAdmin: false,
    address: { type: String },
    isTeacher: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

user.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

user.pre("save", function (next) {
  if (this.email === "admin@gmail.com") {
    this.isAdmin = true;
  }
  next();
});

user.methods.verifyPassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
    res.status(400).send(e);
  }
};

user.methods.signToken = async function () {
  var payload = {
    userId: this._id,
  };
  try {
    const token = jwt.sign(payload, process.env.SECRET);
    return token;
  } catch (error) {
    return error;
  }
};

user.methods.userJson = function (token) {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    bio: this.bio,
    image: this.image,
    phone: this.phone,
    token: token,
    isAdmin: this.isAdmin,
    isTeacher: this.isTeacher,
  };
};
export default mongoose.model("User", user);
