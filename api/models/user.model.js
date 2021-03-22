const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const common = {
  type: String,
  required: true,
  trim: true
};
const defaults = {
  type: String,
  default: ""
}

const UserSchema = new Schema({
  userName: { ...common },
  email: { ...common },
  password: { ...common },
  type: { ...defaults },
  mobile: { ...defaults },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
}