import mongoose from "mongoose";

import validator from "validator";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  passwordConfirmation: {
    // type: String,
    // required: [true, "Please confirm your password"],
    // validate: {
    //   validator: function (el) {
    //     return el === this.password;
    //   },
    //   message: "Passwords are not the same!",
    // },
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});
UserSchema.pre("save", function (next) {
  const error = new Error("Email address is already in use.");
  if (this.isNew) {
    this.constructor
      .findOne({ email: this.email })
      .then((existingUser) => {
        if (existingUser) {
          return next(error);
        }
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
