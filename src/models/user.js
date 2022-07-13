const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username must be unique"],
      trim: true,
      lowercase: true,
      required: [true, "Username is required."],
      match: [/^[a-zA-Z0-9-_]+$/, "Invalid username"],
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required."],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please insert a valid email.",
      ],
    },
    role: {
      type: String,
      enum: {
        values: ["User", "Admin"],
        message: "{VALUE} is not supported.",
      },
      default: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
      match: [
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Invalid password, ",
      ],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// hashing password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// sign user token
UserSchema.methods.getUserJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
