const mongoose = require('mongoose');
const Conversation  = require('./conversation')
const User = require('./user')

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema)
