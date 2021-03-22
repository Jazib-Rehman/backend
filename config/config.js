const mongoose = require('mongoose');
const { CLOUD_URL } = require('./data')

const connection = mongoose.connect(
  CLOUD_URL,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
  error => {
    if (!error) {
      console.log('MongoDB connected');
      // console.log('Sending Query...')
    } else {
      console.error('Error: MongoDB not connected', error);
    }
  }
);

module.exports = connection;