const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  title: String,
  url: String,
  description: String
});

//creating model - model name, schema of the model, collection in db
module.exports = mongoose.model('video', Schema, 'videos');