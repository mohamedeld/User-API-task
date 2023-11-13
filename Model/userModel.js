const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      const email = this.email;
      const salt = "450d0b0db2bcf4adde5032eca1a7c416e560cf44";
      const hash = crypto
        .createHash("sha1")
        .update(email + salt)
        .digest("hex");
      return hash;
    },
  },
  firstName: {
    type: String,
    required: [true, "Please enter your firstName"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your lastName"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  marketingConsent: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
