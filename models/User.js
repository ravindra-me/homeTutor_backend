import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const user = new Schema(
  {
    email: {
      type: String,
      match: /@/,
      required: true,
      unique: true,
      trim: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String, min: 8, max: 15, required: true, minlength: 8 },
    image: { type: String },
    phone: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    isTeacher: { type: Boolean, required: true },
    otp: { type: String },
    isActive: {
      type: Boolean,
      default: false,
    },
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
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "10m",
    });
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
