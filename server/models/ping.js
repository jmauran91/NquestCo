const mongoose = require('mongoose');
const Project = require('./project');
const User = require('./user');

const PingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  text: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})


module.exports = mongoose.model('Ping', PingSchema)
