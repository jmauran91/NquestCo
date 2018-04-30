const mongoose = require('mongoose');
const User = require('./user');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownername: {
    type: String
  },
  users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  usernames: [{
    type: String
  }],
  description: {
    type: String,
  },
  notes: [{
    type: String,
  }],
  documents: [{ type: String }],
  created: {
    type: Date,
    default: Date.now
  }
});

ProjectSchema.index({ description: 'text', title: 'text' })

module.exports = mongoose.model('Project', ProjectSchema);
