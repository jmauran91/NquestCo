const mongoose = require('mongoose');
const User = require('./user');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    index: { unique: true}
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownername: { type: String },
  users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  usernames: [{
    type: String
  }],
  description: String,
  notes: [{
    type: String,
    unique: true
  }],
  documents: [{ type: String }],
  created: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Project', ProjectSchema);
