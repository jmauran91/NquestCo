const mongoose = require('mongoose');
const Project = require('./project');

const ChatboxSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  messages: [{
    type: String
  }]

})

module.exports = mongoose.model('Chatbox', ChatboxSchema)
