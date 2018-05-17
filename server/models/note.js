const mongoose = require('mongoose');
const User = require('./user');
const Project = require('./project');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  body: String,
},
{
  timestamps: true
})


module.exports = mongoose.model('Note', NoteSchema);
