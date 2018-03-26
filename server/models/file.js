const mongoose = require('mongoose');
const User = require('./user');
const Project = require('./project');

const FileSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('File', FileSchema)
