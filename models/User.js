import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  failedLoginAttempts: {
    type: Number,
    default: 3,
  },
  lastFailedLoginAttempt: {
    type: Date,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.decrementFailedLoginAttempts = function () {
  const now = new Date();
  if (this.lastFailedLoginAttempt && now.getDate() !== this.lastFailedLoginAttempt.getDate()) {
    this.failedLoginAttempts = 2;
  } else {
    this.failedLoginAttempts -= 1;
  }
  this.lastFailedLoginAttempt = now;
  return this.failedLoginAttempts;
};

UserSchema.methods.resetFailedLoginAttempts = function () {
  this.failedLoginAttempts = 3;
  this.lastFailedLoginAttempt = null;
};

UserSchema.methods.checkAndResetFailedLoginAttempts = function () {
  const now = new Date();
  if (this.lastFailedLoginAttempt && now.getDate() !== this.lastFailedLoginAttempt.getDate()) {
    this.resetFailedLoginAttempts();
  }
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
