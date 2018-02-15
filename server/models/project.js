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
  users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  description: String,
  documents: [{ type: String }],
  created: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Project', ProjectSchema);
