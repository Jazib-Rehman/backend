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

const ServiceSchema = new Schema({
  artistId: { ...common },
  title: { ...common },
  price: { ...defaults },
  serviceImage: { ...defaults }
}, { timestamps: true });


const Service = mongoose.model('Service', ServiceSchema);

module.exports = {
  Service
}